<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật hoạt động' : 'Thêm mới hoạt động'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
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
          v-bind="$attrs"
          label="Chọn học sinh"
        >
          <b-form-select
            v-model="form.student"
            :options="studentOption"
            :disabled="isEdit"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <base-form-text-input
        v-model="form.date"
        required
        :error="vForm.errors.get('date')"
        placeholder="Ngày"
        disabled
        label="Ngày"
        rules="required|max:100"
        name="name"
        class="w-25"
      />
      <activity-select
        v-model="form.activity"
        required
        rules="required"
        :activities="activities"
      />
      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.timeDur"
            required
            :error="vForm.errors.get('timeDur')"
            placeholder="Thời gian (phút)"
            label="Thời gian (phút)"
            rules="required"
            name="timeDur"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.calo"
            required
            :error="vForm.errors.get('calo')"
            placeholder="Calo"
            label="Calo"
            disabled
            rules="required"
            name="calo"
          />
        </div>
      </div>
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin'
import { PARENTS, STUDENT } from '~/constants/role.constant'
import { convertStringToTimeStamps } from '~/services/convertTimeStamps.service'

const defaultForm = {
  activity: null,
  timeDur: '',
  student: null,
  calo: '0',
}
export default {
  name: 'ScheduleExerciseModal',
  mixins: [BaseFormModal, BaseFormMixin],
  data() {
    return {
      form: cloneDeep(defaultForm),
      studentOption: [],
      selectedStudent: null,
      activities: [],
    }
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
        }

        if (this.$auth.user.role === STUDENT) {
          this.selectedStudent = this.$auth.user.parents.child.find(
            (item) => item._id === newVal
          )
        }
      },
      deep: true,
    },
  },
  async mounted() {
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

    await this.loadActivities()
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
        this.$notifyAddSuccess('hoạt động')
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

        this.$notifyUpdateSuccess('hoạt động')
        this.$refs.modal.hide()

        this.$bus.$emit('reloadScheduleExerciseData')
      } catch (e) {
        this.processError(e)
      }
    },
    async loadActivities() {
      const { data } = await this.$axios.get('/activities/all')
      this.activities = data
    },
  },
}
</script>
