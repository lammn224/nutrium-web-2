<template>
  <div class="login-form login-signup">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        id="kt_login_signup_form"
        class="form"
        novalidate="novalidate"
        method="post"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div class="pb-13 pt-lg-0 pt-5">
          <h3 class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
            Đăng ký
          </h3>
          <p class="text-muted font-weight-bold font-size-h4">
            Điền các thông tin sau để tạo tài khoản hệ thống
          </p>
        </div>
        <ValidationProvider
          v-slot="{ errors }"
          name="Mã trường"
          rules="required"
        >
          <div class="form-group">
            <input
              ref="code"
              v-model="form.code"
              class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
              type="text"
              placeholder="Mã trường"
              name="code"
              autocomplete="off"
            />

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Tên trường"
          rules="required"
        >
          <div class="form-group">
            <input
              ref="name"
              v-model="form.name"
              class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
              type="text"
              placeholder="Tên trường"
              name="name"
              autocomplete="off"
            />

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" name="Họ tên" rules="required">
          <div class="form-group">
            <input
              ref="fullName"
              v-model="form.fullName"
              class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
              type="text"
              placeholder="Họ tên"
              name="fullName"
              autocomplete="off"
            />

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Số điện thoại"
          rules="required"
        >
          <div class="form-group">
            <input
              ref="phoneNumber"
              v-model="form.phoneNumber"
              class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
              type="text"
              placeholder="Số điện thoại"
              name="phoneNumber"
              autocomplete="off"
            />

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Mật khẩu"
          rules="required|max:100|min:8"
          vid="password"
        >
          <div class="form-group">
            <input
              ref="password"
              v-model="form.password"
              class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
              type="password"
              placeholder="Mật khẩu"
              name="password"
              autocomplete="off"
            />

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Xác nhận mật khẩu"
          rules="required|max:100|confirmed:password"
        >
          <div class="form-group">
            <input
              ref="cpassword"
              v-model="form.cpassword"
              class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
              type="password"
              placeholder="Xác nhận mật khẩu"
              name="cpassword"
              autocomplete="off"
            />

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <div class="form-group d-flex flex-wrap pb-lg-0 pb-3">
          <button
            ref="kt_login_signup_submit"
            class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
            :class="[isLoading ? 'spinner spinner-white spinner-right' : null]"
            :disabled="isLoading"
            style="width: 150px"
          >
            Đăng ký
          </button>

          <button
            id="kt_login_signup_cancel"
            type="button"
            class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
            @click="showForm('signin')"
          >
            Huỷ bỏ
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ERROR_CODES } from '~/constants/error-code.constants'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'

export default {
  name: 'AuthRegister',
  mixins: [NotifyMixin],
  data() {
    return {
      form: {
        phoneNumber: '',
        fullName: '',
        password: '',
        cpassword: '',
        code: '',
        name: '',
      },
      isLoading: false,
      error: null,
    }
  },
  methods: {
    async onSubmit() {
      this.error = null
      try {
        this.isLoading = true

        const { data } = await this.$axios.post('/auth/register', this.form)

        this.$auth.strategy.token.set(data.access_token)
        this.$auth.setUser(data.owner)
        this.$auth.loggedIn = true
        await this.$router.push('/')
      } catch (e) {
        this.error = e
        this.$notifyTryAgain(
          this.notifyTitle,
          ERROR_CODES.get(e.response.data.code)
        )
      } finally {
        this.isLoading = false
      }
    },

    showForm(form) {
      this.error = null
      this.phoneNumber = ''
      this.password = ''
      this.$refs.observer.reset()
      this.$emit('showForm', form)
    },
  },
}
</script>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>
