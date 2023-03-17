<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật người dùng' : 'Thêm mới tài khoản học sinh'"
    no-close-on-backdrop
    no-enforce-focus
    cancel-title="Hủy bỏ"
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.studentId"
        required
        :error="vForm.errors.get('studentId')"
        placeholder="Mã học sinh"
        label="Mã học sinh"
        rules="required|max:100"
        name="studentId"
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

      <validation-provider
        v-slot="{ errors }"
        name="Ngày sinh"
        rules="required"
      >
        <b-form-group v-bind="$attrs" label="Ngày sinh">
          <b-form-datepicker
            v-model="form.dateOfBirth"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }"
            locale="vi"
            placeholder="Ngày sinh"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-datepicker>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="Giới tính"
        rules="required"
      >
        <b-form-group v-bind="$attrs" label="Giới tính">
          <b-form-radio-group
            v-model="form.gender"
            :options="genderOptions"
            :state="errors[0] || error !== null ? false : null"
          >
          </b-form-radio-group>

          <b-form-invalid-feedback :force-show="!!errors[0] || !!error">
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <base-form-text-input
        v-model="form.parentsFullName"
        required
        :error="vForm.errors.get('parentsFullName')"
        placeholder="Họ và tên phụ huynh"
        label="Họ và tên phụ huynh"
        rules="required|max:100"
        name="parentsFullName"
      />

      <base-form-text-input
        v-model="form.parentsPhoneNumber"
        required
        :error="vForm.errors.get('parentsPhoneNumber')"
        placeholder="SĐT phụ huynh"
        label="SĐT phụ huynh"
        rules="required|max:100"
        name="parentsPhoneNumber"
      />

      <validation-provider v-slot="{ errors }" name="Lớp" rules="required">
        <b-form-group v-bind="$attrs" label="Lớp">
          <b-form-select
            v-model="form.class"
            :options="classesOption"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
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
  studentId: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
  class: '',
  parentsFullName: '',
  parentsPhoneNumber: '',
}

export default {
  name: 'StudentModal',
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

  async mounted() {
    await this.loadClassOption()
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
        await this.vForm.post(this.$axios.defaults.baseURL + '/students')

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

    async loadClassOption() {
      const { data } = await this.$axios.get('/classes')

      const classes = data.results

      classes.forEach((classObj) => {
        this.classesOption.push({ value: classObj._id, text: classObj.name })
      })
    },
  },
}
</script>
