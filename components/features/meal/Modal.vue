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

      <div v-if="$auth.user.child" class="row">
        <div class="col-xl-4">
          <base-form-text-input
            :value="`${$auth.user.child.rcmCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="Năng lượng khuyến nghị"
            name="name"
          />
        </div>

        <div class="col-xl-4">
          <base-form-text-input
            :value="`45% ~ ${$auth.user.child.maxBreakfastCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="% Năng lượng khuyến nghị bữa sáng"
            name="name"
          />
        </div>

        <div class="col-xl-4">
          <base-form-text-input
            :value="`20% ~ ${$auth.user.child.maxDinnerCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="% Năng lượng khuyến nghị bữa tối"
            name="name"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3">
          <base-form-text-input
            v-model="form.power"
            required
            disabled
            :error="vForm.errors.get('power')"
            placeholder="Năng lượng"
            label="Năng lượng"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
        </div>
        <div class="col-xl-3">
          <base-form-text-input
            v-model="form.protein"
            required
            disabled
            :error="vForm.errors.get('protein')"
            placeholder="Protein"
            label="Protein"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
        </div>
        <div class="col-xl-3">
          <base-form-text-input
            v-model="form.lipid"
            required
            disabled
            :error="vForm.errors.get('lipid')"
            placeholder="Lipid"
            label="Lipid"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
        </div>
        <div class="col-xl-3">
          <base-form-text-input
            v-model="form.glucid"
            required
            disabled
            :error="vForm.errors.get('glucid')"
            placeholder="Glucid"
            label="Glucid"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
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
import { ADMIN, PARENTS } from '~/constants/role.constant'
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

const defaultForm = {
  type: MEALS.get(LAUNCH),
  date: '',
  power: '0',
  protein: '0',
  lipid: '0',
  glucid: '0',
  foods: [],
}
export default {
  name: 'MealModal',
  mixins: [BaseFormModal, BaseFormMixin],
  data() {
    return {
      selected: null,
      options:
        this.$auth.user.role === PARENTS
          ? [
              { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
              { value: DINNER, text: MEALS.get(DINNER) },
            ]
          : [{ value: LAUNCH, text: MEALS.get(LAUNCH) }],

      isEditOptions: [
        { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
        { value: LAUNCH, text: MEALS.get(LAUNCH) },
        { value: DINNER, text: MEALS.get(DINNER) },
      ],
      form: cloneDeep(defaultForm),
    }
  },
  computed: {
    ...mapGetters({
      foods: 'food/foods',
    }),
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
        this.$notifyErrMsg(e.response.data.message)
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
        this.$notifyErrMsg(e.response.data.message)
      }
    },
  },
}
</script>
