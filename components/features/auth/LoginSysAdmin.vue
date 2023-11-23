<template>
  <div class="login-form login-signin-sysadmin">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        id="kt_login_signinsysadmin_form"
        class="form"
        method="post"
        novalidate="novalidate"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div class="pb-13 pt-lg-0 pt-5 min-w-450px">
          <h3 class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
            Chào mừng tới Nutrium
          </h3>
          <span class="text-muted font-weight-bold font-size-h4">
            Quản trị viên hệ thống
            <div class="pt-13 pt-5">
              <a
                id="kt_login_siginsysadmin"
                class="text-primary font-weight-bolder"
                href="javascript:"
                tabindex="4"
                @click="showForm('signin')"
              >
                Đăng nhập với vai trò khác
              </a>
            </div>
          </span>
        </div>

        <h4 v-if="error" class="text-danger">
          Thông tin đăng nhập không đúng!
        </h4>

        <ValidationProvider
          v-slot="{ errors }"
          name="Số điện thoại"
          rules="required"
        >
          <div class="form-group">
            <label class="font-size-h6 font-weight-bolder text-dark"
              >Số điện thoại</label
            >
            <div
              id="phone-number-input-group"
              label="phoneNumber"
              label-for="phone-number-input-group"
            >
              <input
                ref="phoneNumber"
                v-model="phoneNumber"
                class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                name="phoneNumber"
                placeholder="Nhập số điện thoại..."
                tabindex="1"
                type="text"
              />
            </div>

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Mật khẩu"
          rules="required"
        >
          <div class="form-group">
            <div class="d-flex justify-content-between mt-n5">
              <label class="font-size-h6 font-weight-bolder text-dark pt-5"
                >Mật khẩu</label
              >
              <!--              <a-->
              <!--                id="kt_login_forgot"-->
              <!--                class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"-->
              <!--                href="javascript:"-->
              <!--                tabindex="4"-->
              <!--                @click="showForm('forgot')"-->
              <!--              >Quên mật khẩu ?</a-->
              <!--              >-->
            </div>
            <div
              id="password-input-group"
              label=""
              label-for="password-input-group"
            >
              <input
                ref="password"
                v-model="password"
                autocomplete="off"
                class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                name="password"
                placeholder="Nhập mật khẩu của bạn..."
                tabindex="2"
                type="password"
              />
            </div>

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <div class="pb-lg-0 pb-5">
          <button
            ref="kt_login_signin_submit"
            :class="[isLoading ? 'spinner spinner-white spinner-right' : null]"
            :disabled="isLoading"
            class="btn btn-block btn-primary font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
            tabindex="3"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'AuthLoginSysAdmin',
  data() {
    return {
      phoneNumber: '',
      password: '',
      isLoading: false,
      error: null,
    }
  },

  methods: {
    async onSubmit() {
      this.error = null
      try {
        this.isLoading = true

        await this.$auth.loginWith('localSysAdmin', {
          data: {
            phoneNumber: this.phoneNumber,
            password: this.password,
          },
        })

        await this.$router.push('/')
      } catch (e) {
        this.error = e
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
