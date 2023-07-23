<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật bài tập' : 'Thêm mới bài tập'"
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
        placeholder="Tên bài tập"
        label="Tên bài tập"
        rules="required|max:100"
        name="name"
        class="w-25"
      />

      <base-form-text-input
        v-model="form.metIdx"
        required
        :error="vForm.errors.get('metIdx')"
        placeholder="Chỉ số MET"
        label="Chỉ số MET"
        rules="required|max:100"
        name="name"
        class="w-25"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal.vue'
import BaseFormMixin from '~/components/base/form/Mixin.vue'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'

const defaultForm = {
  name: '',
  metIdx: '',
  school: null,
}
export default {
  name: 'ActivityModal',
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
      if (this.$auth.user.school) {
        form.school = this.$auth.user.school._id
      }
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/activities')
        this.$notifySuccess(this.notifyTitle, 'Thêm bài tập thành công!')
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
          this.$axios.defaults.baseURL + '/activities/' + this.form._id
        )

        this.$notifySuccess(this.notifyTitle, 'Cập nhật bài tập thành công!')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
