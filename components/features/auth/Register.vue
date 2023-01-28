<template>
  <div class="login-form login-signup">
    <form id="kt_login_signup_form" class="form" novalidate="novalidate">
      <div class="pb-13 pt-lg-0 pt-5">
        <h3 class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
          Sign Up
        </h3>
        <p class="text-muted font-weight-bold font-size-h4">
          Enter your details to create your account
        </p>
      </div>
      <div class="form-group">
        <input
          ref="fullname"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="text"
          placeholder="Fullname"
          name="fullname"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <input
          ref="remail"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="email"
          placeholder="Email"
          name="email"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <input
          ref="rpassword"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="password"
          placeholder="Password"
          name="password"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <input
          ref="cpassword"
          class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
          type="password"
          placeholder="Confirm password"
          name="cpassword"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <label class="checkbox mb-0">
          <input type="checkbox" name="agree" />
          <span class="mr-2"></span>
          I Agree the
          <a href="#" class="ml-2">terms and conditions</a>.
        </label>
      </div>
      <div class="form-group d-flex flex-wrap pb-lg-0 pb-3">
        <button
          ref="kt_login_signup_submit"
          class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
          style="width: 150px"
        >
          Submit
        </button>
        <button
          id="kt_login_signup_cancel"
          type="button"
          class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
          @click="showForm('signin')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AuthRegister',
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

        await this.$auth.login({
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
      // this.$refs.observer.reset()
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
