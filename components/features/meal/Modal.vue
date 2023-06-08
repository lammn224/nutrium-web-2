<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="
      !isEdit
        ? 'Thêm mới bữa ăn'
        : $auth.user._id !== form.createdBy
        ? 'Xem bữa ăn'
        : 'Cập nhật bữa ăn'
    "
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    :hide-footer="
      $auth.user._id !== form.createdBy ||
      convertStringToTimeStamps(form.date) <
        convertStringToTimeStamps(dateToString(new Date()))
    "
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <validation-provider
        v-if="isEdit"
        v-slot="{ errors }"
        name="Loại bữa ăn"
        rules="required"
      >
        <b-form-group v-if="isEdit" v-bind="$attrs" label="Loại bữa ăn">
          <b-form-select
            v-model="form.type"
            :options="isEditOptions"
            :state="errors[0] || error !== null ? false : null"
            disabled
          >
          </b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        v-if="!isEdit"
        v-slot="{ errors }"
        name="Loại bữa ăn"
        rules="required"
      >
        <b-form-group v-if="!isEdit" v-bind="$attrs" label="Loại bữa ăn">
          <b-form-select
            v-model="form.type"
            :options="options"
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

      <validation-provider
        v-if="form.createdBy === $auth.user._id && $auth.user.role !== ADMIN()"
        v-slot="{ errors }"
        name="Học sinh"
        rules="required"
      >
        <b-form-group
          v-if="$auth.user.role !== ADMIN()"
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

      <div
        v-if="
          ((selectedStudent || form.student) && $auth.user.child) ||
          selectedStudent
        "
        class="row"
      >
        <div class="col-xl-4">
          <base-form-text-input
            :value="`${selectedStudent.rcmCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="Năng lượng khuyến nghị"
            name="name"
          />
        </div>

        <div class="col-xl-4">
          <base-form-text-input
            :value="`45% ~ ${selectedStudent.maxBreakfastCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="% Năng lượng khuyến nghị bữa sáng"
            name="name"
          />
        </div>

        <div class="col-xl-4">
          <base-form-text-input
            :value="`20% ~ ${selectedStudent.maxDinnerCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="% Năng lượng khuyến nghị bữa tối"
            name="name"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Năng lượng"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
          >
            <b-form-group v-bind="$attrs" label="Năng lượng">
              <b-form-input
                v-model="form.power"
                class="border border-2 border-primary"
                disabled
                placeholder="Năng lượng"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Protein"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
          >
            <b-form-group v-bind="$attrs" label="Protein">
              <b-form-input
                v-model="form.protein"
                class="border border-2 border-primary"
                disabled
                placeholder="Protein"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!--          <base-form-text-input-->
          <!--            v-model="form.protein"-->
          <!--            required-->
          <!--            disabled-->
          <!--            :error="vForm.errors.get('protein')"-->
          <!--            placeholder="Protein"-->
          <!--            label="Protein"-->
          <!--            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"-->
          <!--            name="name"-->
          <!--          />-->
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Lipid"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
          >
            <b-form-group v-bind="$attrs" label="Lipid">
              <b-form-input
                v-model="form.lipid"
                class="border border-2 border-primary"
                disabled
                placeholder="Lipid"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Glucid"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
          >
            <b-form-group v-bind="$attrs" label="Glucid">
              <b-form-input
                v-model="form.glucid"
                class="border border-2 border-primary"
                disabled
                placeholder="Glucid"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
      </div>
    </validation-observer>

    <food-selection v-model="form.foods" :food-list="foods"></food-selection>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import { mapGetters } from 'vuex'
import BaseFormModal from '~/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin'
import { ADMIN, PARENTS, STUDENT } from '~/constants/role.constant'
import {
  BREAKFAST,
  DINNER,
  LAUNCH,
  MEALS,
} from '~/constants/meal-type.constant'
import {
  convertStringToTimeStamps,
  convertTimeStampsToString,
  dateToString,
} from '~/services/convertTimeStamps.service'
import { ERROR_CODES } from '~/constants/error-code.constants'

const defaultForm = {
  type: MEALS.get(LAUNCH),
  date: '',
  power: '0',
  protein: '0',
  lipid: '0',
  glucid: '0',
  student: null,
  foods: [],
  isCreatedByAdmin: null,
}
export default {
  name: 'MealModal',
  mixins: [BaseFormModal, BaseFormMixin],
  props: {
    momentDay: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: null,
      // options:
      //   // this.$auth.user.role === PARENTS
      //   //   ? [
      //   //       { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
      //   //       { value: DINNER, text: MEALS.get(DINNER) },
      //   //     ]
      //   //   : [{ value: LAUNCH, text: MEALS.get(LAUNCH) }],
      //
      //   this.$auth.user.role === ADMIN
      //     ? [{ value: LAUNCH, text: MEALS.get(LAUNCH) }]
      //     : this.momentDay.date.locale('en').format('ddd') === 'Sun' || this.momentDay.date.locale('en').format('ddd') === 'Sat'
      //     ? [
      //         { value: LAUNCH, text: MEALS.get(LAUNCH) },
      //         { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
      //         { value: DINNER, text: MEALS.get(DINNER) },
      //       ]
      //     : [
      //         { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
      //         { value: DINNER, text: MEALS.get(DINNER) },
      //       ],

      isEditOptions: [
        { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
        { value: LAUNCH, text: MEALS.get(LAUNCH) },
        { value: DINNER, text: MEALS.get(DINNER) },
      ],
      form: cloneDeep(defaultForm),
      studentOption: [],
      selectedStudent: null,
    }
  },
  computed: {
    ...mapGetters({
      foods: 'food/foods',
    }),

    options() {
      // this.$auth.user.role === PARENTS
      //   ? [
      //       { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
      //       { value: DINNER, text: MEALS.get(DINNER) },
      //     ]
      //   : [{ value: LAUNCH, text: MEALS.get(LAUNCH) }],

      return this.$auth.user.role === ADMIN
        ? [{ value: LAUNCH, text: MEALS.get(LAUNCH) }]
        : this.momentDay.date.locale('en').format('ddd') === 'Sun' ||
          this.momentDay.date.locale('en').format('ddd') === 'Sat'
        ? [
            { value: LAUNCH, text: MEALS.get(LAUNCH) },
            { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
            { value: DINNER, text: MEALS.get(DINNER) },
          ]
        : [
            { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
            { value: DINNER, text: MEALS.get(DINNER) },
          ]
    },
  },
  watch: {
    'form.foods': {
      handler(newVal, oldVal) {
        this.form.power = '0'
        this.form.protein = '0'
        this.form.lipid = '0'
        this.form.glucid = '0'
        newVal.forEach((id) => {
          const food = this.foods.find((item) => item._id === id)
          this.form.power = (
            parseFloat(this.form.power) + parseFloat(food.power)
          )
            .toFixed(2)
            .toString()
          this.form.protein = (
            parseFloat(this.form.protein) + parseFloat(food.protein)
          )
            .toFixed(2)
            .toString()
          this.form.lipid = (
            parseFloat(this.form.lipid) + parseFloat(food.lipid)
          )
            .toFixed(2)
            .toString()
          this.form.glucid = (
            parseFloat(this.form.glucid) + parseFloat(food.glucid)
          )
            .toFixed(2)
            .toString()
        })
        this.form.school = this.$auth.user.school._id
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
    dateToString,
    convertStringToTimeStamps,
    convertTimeStampsToString,
    LAUNCH() {
      return LAUNCH
    },
    PARENTS() {
      return PARENTS
    },
    ADMIN() {
      return ADMIN
    },
    show(item) {
      if (item) {
        this.isEdit = true
        this.form = cloneDeep(item)
      }

      if (item.date && item.power === '0') {
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
      this.error = null
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        form.date = convertStringToTimeStamps(form.date)
        this.vForm = new Form(form)

        await this.vForm.post(this.$axios.defaults.baseURL + '/meals')
        this.$notifyAddSuccess('bữa ăn')
        this.$refs.modal.hide()
        this.form = cloneDeep(defaultForm)

        this.$bus.$emit('reloadMealData')
      } catch (e) {
        // this.$refs.modal.hide()
        this.$notifyErrMsg(ERROR_CODES.get(e.response.data.code))
      }
    },
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        form.date = convertStringToTimeStamps(form.date)
        this.vForm = new Form(form)

        await this.vForm.patch(
          this.$axios.defaults.baseURL + '/meals/' + this.form._id
        )
        this.$notifyUpdateSuccess('bữa ăn')
        this.$refs.modal.hide()

        this.$bus.$emit('reloadMealData')
      } catch (e) {
        // this.$refs.modal.hide()
        this.$notifyErrMsg(ERROR_CODES.get(e.response.data.code))
      }
    },
  },
}
</script>
