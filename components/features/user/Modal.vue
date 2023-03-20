<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật người dùng' : 'Thêm mới tài khoản admin'"
    no-close-on-backdrop
    no-enforce-focus
    cancel-title="Hủy bỏ"
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.phoneNumber"
        required
        :error="vForm.errors.get('phoneNumber')"
        placeholder="Số điện thoại"
        label="Số điện thoại"
        rules="required|max:100"
        name="phoneNumber"
      />

      <base-form-text-input
        v-model="form.fullName"
        required
        :error="vForm.errors.get('fullName')"
        placeholder="Họ và tên"
        label="Họ và tên"
        rules="required|max:100"
        name="fullName"
      />

      <base-form-text-input
        v-model="form.password"
        required
        :error="vForm.errors.get('password')"
        placeholder="Mật khẩu"
        label="Mật khẩu"
        vid="password"
        rules="required|min:8|max:100"
        name="password"
        type="password"
      />

      <base-form-text-input
        v-model="form.confirmPassword"
        required
        :error="vForm.errors.get('confirmPassword')"
        placeholder="Nhập lại mật khẩu"
        label="Xác nhận mật khẩu"
        rules="required|max:100|confirmed:password"
        name="confirmPassword"
        type="password"
      />
    </validation-observer>
  </b-modal>
</template>

<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import BaseFormModal from '@/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin.vue'
import { ERROR_CODES } from '~/constants/error-code.constants'
import { convertTimeStampsToDatePickerString } from '~/services/convertTimeStamps.service'

const defaultForm = {
  phoneNumber: '',
  fullName: '',
  password: '',
  confirmPassword: '',
}

export default {
  name: 'UserModal',
  mixins: [BaseFormModal, BaseFormMixin],
  data() {
    return {
      form: cloneDeep(defaultForm),
      classesOption: [],
      genderOptions: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
      datePickerOptions: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
    }
  },

  methods: {
    show(item) {
      if (item) {
        this.isEdit = true
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

    async addItem() {
      try {
        this.form.dateOfBirth = new Date(this.form.dateOfBirth).getTime() / 1000

        this.vForm = new Form(this.form)
        await this.vForm.post(
          this.$axios.defaults.baseURL + '/school-users/admin'
        )

        this.$notifyAddSuccess('người dùng')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.form.dateOfBirth = convertTimeStampsToDatePickerString(
          this.form.dateOfBirth
        )
        this.$notifyErrMsg(ERROR_CODES.get(e.response.data.code))
        // this.processError(e)
      }
    },
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.patch(
          this.$axios.defaults.baseURL + '/users/' + this.form._id
        )

        this.$notifyUpdateSuccess('người dùng')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>
