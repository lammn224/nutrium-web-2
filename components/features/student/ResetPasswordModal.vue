<template>
  <b-modal
    ref="resetPasswordModal"
    ok-title="Thay đổi"
    :title="'Đặt lại mật khẩu người dùng ' + form.fullName"
    no-close-on-backdrop
    no-enforce-focus
    cancel-title="Hủy bỏ"
    size="lg"
    @ok="handleResetPasswordModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.newPassword"
        required
        :error="vForm.errors.get('newPassword')"
        placeholder="Mật khẩu"
        label="Mật khẩu"
        vid="newPassword"
        rules="required|min:8|max:100"
        name="newPassword"
        type="password"
      />

      <base-form-text-input
        v-model="form.confirm_password"
        required
        :error="vForm.errors.get('confirm_password')"
        placeholder="Nhập lại mật khẩu"
        label="Xác nhận mật khẩu"
        rules="required|max:100|confirmed:newPassword"
        name="confirm_password"
        type="password"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'
import { ERROR_CODES } from '~/constants/error-code.constants'

const defaultForm = {
  newPassword: '',
  confirm_password: '',
}

export default {
  name: 'StudentResetPasswordModal',
  mixins: [BaseFormModal, NotifyMixin],
  data() {
    return {
      form: cloneDeep(defaultForm),
    }
  },
  methods: {
    show(item) {
      this.form = cloneDeep(item)

      this.$nextTick(() => {
        this.$refs.resetPasswordModal.show()
      })
    },
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
    },
    async handleResetPasswordModalOk(bvModalEvt) {
      bvModalEvt.preventDefault()

      await this.validateForm()
    },
    async validateForm() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        await this.resetPassword()
      }
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      return form
    },
    async resetPassword() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(
          this.$axios.defaults.baseURL +
            '/students/' +
            this.form._id +
            '/reset-password'
        )

        this.$notifySuccess(
          this.notifyTitle,
          'Đặt lại mật khẩu người dùng thành công!'
        )
        this.$refs.resetPasswordModal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
    processError(e) {
      if (e.response) {
        if (e.response.status === 422) {
          this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
        } else if (e.response.status === 500) {
          this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
        } else {
          this.$notifyTryAgain(
            this.notifyTitle,
            ERROR_CODES.get(e.response.data.code)
          )
        }
      } else {
        this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
      }
    },
  },
}
</script>
