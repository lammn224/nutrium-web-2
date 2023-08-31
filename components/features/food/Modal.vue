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
      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.power"
            required
            :error="vForm.errors.get('power')"
            placeholder="Năng lượng"
            label="Năng lượng"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.protein"
            required
            :error="vForm.errors.get('protein')"
            placeholder="Protein"
            label="Protein"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.lipid"
            required
            :error="vForm.errors.get('lipid')"
            placeholder="Lipid"
            label="Lipid"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.glucid"
            required
            :error="vForm.errors.get('glucid')"
            placeholder="Glucid"
            label="Glucid"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.ca"
            required
            :error="vForm.errors.get('ca')"
            placeholder="Canxi"
            label="Canxi"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.fe"
            required
            :error="vForm.errors.get('fe')"
            placeholder="Sắt"
            label="Sắt"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.zn"
            required
            :error="vForm.errors.get('zn')"
            placeholder="Kẽm"
            label="Kẽm"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.fiber"
            required
            :error="vForm.errors.get('fiber')"
            placeholder="Chất xơ"
            label="Chất xơ"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
            name="name"
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
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'

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
  mixins: [BaseFormModal, BaseFormMixin, NotifyMixin],
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
      form.power = Number(form.power).toFixed(2)
      form.protein = Number(form.protein).toFixed(2)
      form.lipid = Number(form.lipid).toFixed(2)
      form.glucid = Number(form.glucid).toFixed(2)
      form.ca = Number(form.ca).toFixed(2)
      form.fe = Number(form.fe).toFixed(2)
      form.zn = Number(form.zn).toFixed(2)
      form.fiber = Number(form.fiber).toFixed(2)
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/foods')
        this.$notifySuccess(this.notifyTitle, 'Thêm món ăn thành công!')
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

        this.$notifySuccess(this.notifyTitle, 'Cập nhật món ăn thành công!')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
