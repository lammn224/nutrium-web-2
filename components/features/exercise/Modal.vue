<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật hoạt động' : 'Thêm mới hoạt động'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @hidden="handleModalHidden"
    @ok="handleModalOk"
  >
    <validation-observer ref="observer">
      <validation-provider
        v-if="$auth.user.role === PARENTS()"
        v-slot="{ errors }"
        name="Học sinh"
        rules="required"
      >
        <b-form-group
          v-if="$auth.user.role === PARENTS()"
          label="Chọn học sinh"
          v-bind="$attrs"
        >
          <b-form-select
            v-model="form.student"
            :disabled="isEdit"
            :options="studentOption"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <base-form-text-input
        v-model="form.date"
        :error="vForm.errors.get('date')"
        class="w-25"
        disabled
        label="Ngày"
        name="name"
        placeholder="Ngày"
        required
        rules="required|max:100"
      />
      <!--      <activity-select-->
      <!--        v-model="form.activity"-->
      <!--        :activities="activities"-->
      <!--        required-->
      <!--        rules="required"-->
      <!--      />-->

      <div class="form-group w-100">
        <el-select
          v-model="form.activity"
          clearable
          filterable
          placeholder="Select"
          value-key="_id"
        >
          <el-option-group
            v-for="group in activityOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.timeDur"
            :error="vForm.errors.get('timeDur')"
            label="Thời gian (phút)"
            name="timeDur"
            placeholder="Thời gian (phút)"
            required
            rules="required"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.calo"
            :error="vForm.errors.get('calo')"
            disabled
            label="Calo"
            name="calo"
            placeholder="Calo"
            required
            rules="required"
          />
        </div>
      </div>
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import { mapGetters } from 'vuex'
import BaseFormModal from '~/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin'
import { PARENTS, STUDENT } from '~/constants/role.constant'
import { convertStringToTimeStamps } from '~/services/convertTimeStamps.service'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'
import { LIGHT, MODERATE, HEAVY } from '~/constants/activity-type.constant'

const defaultForm = {
  activity: null,
  timeDur: '',
  student: null,
  calo: '0',
}
export default {
  name: 'ScheduleExerciseModal',
  mixins: [BaseFormModal, BaseFormMixin, NotifyMixin],
  data() {
    return {
      form: cloneDeep(defaultForm),
      studentOption: [],
      selectedStudent: null,
    }
  },

  computed: {
    ...mapGetters({
      activities: 'activity/activities',
    }),

    activityOptions() {
      const options = [
        {
          label: 'Nhẹ',
          options: [],
        },
        {
          label: 'Trung bình',
          options: [],
        },
        {
          label: 'Nặng',
          options: [],
        },
        {
          label: 'Khác',
          options: [],
        },
      ]

      this.activities.forEach((a) => {
        if (a.level === LIGHT) {
          options[0].options.push({
            value: a,
            label: a.name,
          })
        } else if (a.level === MODERATE) {
          options[1].options.push({
            value: a,
            label: a.name,
          })
        } else if (a.level === HEAVY) {
          options[2].options.push({
            value: a,
            label: a.name,
          })
        } else {
          options[3].options.push({
            value: a,
            label: a.name,
          })
        }
      })
      return options
    },
  },

  watch: {
    'form.activity': {
      handler(newVal, oldVal) {
        this.form.calo =
          (this.form.timeDur *
            (newVal?.metIdx * 3.5 * this.selectedStudent?.weight)) /
          200
      },
      deep: true,
    },

    'form.timeDur': {
      handler(newVal, oldVal) {
        this.form.calo =
          (newVal *
            (this.form.activity?.metIdx * 3.5 * this.selectedStudent?.weight)) /
          200
      },
      deep: true,
    },

    'form.student': {
      handler(newVal, oldVal) {
        if (this.$auth.user.role === PARENTS) {
          this.selectedStudent = this.$auth.user.child.find(
            (item) => item._id === newVal
          )
          this.form.calo =
            (this.form.timeDur *
              (this.form.activity?.metIdx *
                3.5 *
                this.selectedStudent?.weight)) /
            200
        }

        if (this.$auth.user.role === STUDENT) {
          this.selectedStudent = this.$auth.user.parents.child.find(
            (item) => item._id === newVal
          )
          this.form.calo =
            (this.form.timeDur *
              (this.form.activity?.metIdx *
                3.5 *
                this.selectedStudent?.weight)) /
            200
        }
      },
      deep: true,
    },
  },

  mounted() {
    if (this.$auth.user.role === PARENTS) {
      this.$auth.user.child.forEach((student) => {
        this.studentOption.push({
          value: student._id,
          text: student.fullName,
        })
      })
    }
    if (this.$auth.user.role === STUDENT) {
      this.selectedStudent = this.$auth.user
    }
  },

  methods: {
    PARENTS() {
      return PARENTS
    },
    show(item) {
      if (item) {
        this.isEdit = true
        this.form = cloneDeep(item)
      }

      if (item.date && item.calo === '0') {
        this.isEdit = false
        this.form = cloneDeep(item)
      }

      this.$nextTick(() => {
        this.$refs.modal.show()
      })
    },
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
      this.isEdit = false
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      if (this.$auth.user.role === STUDENT) {
        form.student = this.$auth.user._id
      }
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        form.date = convertStringToTimeStamps(form.date)
        form.activity = form.activity._id
        this.vForm = new Form(form)

        await this.vForm.post(
          this.$axios.defaults.baseURL + '/schedule-exercise'
        )
        this.$notifySuccess(this.notifyTitle, 'Thêm hoạt động thành công!')
        this.$refs.modal.hide()
        this.form = cloneDeep(defaultForm)

        this.$bus.$emit('reloadScheduleExerciseData')
      } catch (e) {
        this.processError(e)
      }
    },
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        form.date = convertStringToTimeStamps(form.date)
        this.vForm = new Form(form)

        await this.vForm.patch(
          this.$axios.defaults.baseURL + '/schedule-exercise/' + this.form._id
        )

        this.$notifySuccess(this.notifyTitle, 'Cập nhật hoạt động thành công!')
        this.$refs.modal.hide()

        this.$bus.$emit('reloadScheduleExerciseData')
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
