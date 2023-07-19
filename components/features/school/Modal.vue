<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật trường học' : 'Thêm mới trường học'"
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
        placeholder="Tên trường học"
        label="Tên trường học"
        rules="required|max:100"
        name="name"
        class="w-25"
      />

      <base-form-text-input
        v-model="form.code"
        required
        :error="vForm.errors.get('code')"
        placeholder="Mã trường học"
        label="Mã trường học"
        rules="required|max:100"
        name="code"
        class="w-25"
      />

      <base-form-text-input
        v-model="form.fullName"
        required
        :error="vForm.errors.get('fullName')"
        placeholder="Họ và tên người đại diện/ quản lý"
        label="Họ và tên người đại diện/ quản lý"
        rules="required|max:100"
        name="fullName"
        class="w-25"
      />

      <base-form-text-input
        v-model="form.phoneNumber"
        required
        :error="vForm.errors.get('phoneNumber')"
        placeholder="Số điện thoại"
        label="Số điện thoại"
        rules="required|max:100"
        name="phoneNumber"
        class="w-25"
      />
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
  code: '',
  fullName: '',
  phoneNumber: '',
}
export default {
  name: 'SchoolModal',
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
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/schools')
        this.$notifySuccess(this.notifyTitle, 'Thêm trường học thành công!')
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
          this.$axios.defaults.baseURL + '/schools/' + this.form._id
        )

        this.$notifySuccess(this.notifyTitle, 'Cập nhật trường học thành công!')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
