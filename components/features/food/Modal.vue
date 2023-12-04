<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật món ăn' : 'Thêm mới món ăn'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @hidden="handleModalHidden"
    @ok="handleModalOk"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.name"
        :error="vForm.errors.get('name')"
        class="w-25"
        label="Tên món ăn"
        name="name"
        placeholder="Tên món ăn"
        required
        rules="required|max:100"
      />
      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.power"
            :error="vForm.errors.get('power')"
            label="Năng lượng (kcal)"
            name="name"
            placeholder="Năng lượng"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.protein"
            :error="vForm.errors.get('protein')"
            label="Protein (g)"
            name="name"
            placeholder="Protein"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.lipid"
            :error="vForm.errors.get('lipid')"
            label="Lipid (g)"
            name="name"
            placeholder="Lipid"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.glucid"
            :error="vForm.errors.get('glucid')"
            label="Glucid (g)"
            name="name"
            placeholder="Glucid"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.ca"
            :error="vForm.errors.get('ca')"
            label="Canxi"
            name="name"
            placeholder="Canxi (mg)"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.fe"
            :error="vForm.errors.get('fe')"
            label="Sắt (mg)"
            name="name"
            placeholder="Sắt"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.zn"
            :error="vForm.errors.get('zn')"
            label="Kẽm (mg)"
            name="name"
            placeholder="Kẽm"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          />
        </div>
        <div class="col-xl-6">
          <base-form-text-input
            v-model="form.fiber"
            :error="vForm.errors.get('fiber')"
            label="Chất xơ (g)"
            name="name"
            placeholder="Chất xơ"
            required
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
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
