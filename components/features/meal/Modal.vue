<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật bữa ăn' : 'Thêm mới bữa ăn'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-if="$auth.user.role === ADMIN()"
        v-model="form.type"
        required
        disabled
        :error="vForm.errors.get('type')"
        placeholder="Loại bữa ăn"
        label="Loại bữa ăn"
        rules="required|max:100"
        name="name"
        class="w-25"
      />

      <validation-provider
        v-if="$auth.user.role === PARENTS()"
        v-slot="{ errors }"
        name="Loại bữa ăn"
        rules="required"
      >
        <b-form-group
          v-if="$auth.user.role === PARENTS()"
          v-bind="$attrs"
          label="Loại bữa ăn"
        >
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

    <food-selection v-model="foods"></food-selection>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin'
import { ADMIN, PARENTS } from '~/constants/role.constant'
import {
  BREAKFAST,
  DINNER,
  LAUNCH,
  MEALS,
} from '~/constants/meal-type.constant'

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
      options: [
        { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
        { value: DINNER, text: MEALS.get(DINNER) },
      ],
      form: cloneDeep(defaultForm),
      foods: [],
    }
  },
  watch: {
    foods(newVal) {
      this.form.power = '0'
      this.form.protein = '0'
      this.form.lipid = '0'
      this.form.glucid = '0'
      this.form.foods = []
      newVal.forEach((food) => {
        this.form.power = (parseFloat(this.form.power) + parseFloat(food.power))
          .toFixed(2)
          .toString()
        this.form.protein = (
          parseFloat(this.form.protein) + parseFloat(food.protein)
        )
          .toFixed(2)
          .toString()
        this.form.lipid = (parseFloat(this.form.lipid) + parseFloat(food.lipid))
          .toFixed(2)
          .toString()
        this.form.glucid = (
          parseFloat(this.form.glucid) + parseFloat(food.glucid)
        )
          .toFixed(2)
          .toString()

        this.form.foods.push(food._id)
      })
      this.form.school = this.$auth.user.school._id
    },
  },
  methods: {
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
    // eslint-disable-next-line require-await
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        console.log(form)
        // await this.vForm.post(this.$axios.defaults.baseURL + '/foods')
        this.$notifyAddSuccess('bữa ăn')
        this.$refs.modal.hide()
        this.form = cloneDeep(defaultForm)
        this.foods = []
        // this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.patch(
          this.$axios.defaults.baseURL + '/foods/' + this.form._id
        )

        this.$notifyUpdateSuccess('bữa ăn')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
