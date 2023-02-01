<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật món ăn' : 'Thêm mới món ăn'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.name"
        required
        :error="vForm.errors.get('name')"
        placeholder="Tên món ăn"
        label="Tên món ăn"
        rules="required|max:100"
        name="name"
        class="w-25"
      />

      <base-form-text-input
        v-model="form.power"
        required
        :error="vForm.errors.get('power')"
        placeholder="Năng lượng"
        label="Năng lượng"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />

      <base-form-text-input
        v-model="form.protein"
        required
        :error="vForm.errors.get('protein')"
        placeholder="Protein"
        label="Protein"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />

      <base-form-text-input
        v-model="form.lipid"
        required
        :error="vForm.errors.get('lipid')"
        placeholder="Lipid"
        label="Lipid"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />

      <base-form-text-input
        v-model="form.glucid"
        required
        :error="vForm.errors.get('glucid')"
        placeholder="Glucid"
        label="Glucid"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />

      <base-form-text-input
        v-model="form.ca"
        required
        :error="vForm.errors.get('ca')"
        placeholder="Canxi"
        label="Canxi"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />

      <base-form-text-input
        v-model="form.fe"
        required
        :error="vForm.errors.get('fe')"
        placeholder="Sắt"
        label="Sắt"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />

      <base-form-text-input
        v-model="form.zn"
        required
        :error="vForm.errors.get('zn')"
        placeholder="Kẽm"
        label="Kẽm"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />

      <base-form-text-input
        v-model="form.fiber"
        required
        :error="vForm.errors.get('fiber')"
        placeholder="Chất xơ"
        label="Chất xơ"
        rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
        name="name"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'

const defaultForm = {
  name: '',
  power: '',
  protein: '',
  lipid: '',
  glucid: '',
  ca: '',
  fe: '',
  zn: '',
  fiber: '',
}
export default {
  name: 'FoodModal',
  mixins: [BaseFormModal],
  data() {
    return {
      form: cloneDeep(defaultForm),
    }
  },
  methods: {
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
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/foods')
        this.$notifyAddSuccess('món ăn')
        this.$refs.modal.hide()
        this.onActionSuccess()
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

        this.$notifyUpdateSuccess('món ăn')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
