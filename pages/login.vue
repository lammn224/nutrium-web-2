z
<template>
  <div class="d-flex flex-column flex-root">
    <div
      id="kt_login"
      class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid bg-white"
      :class="{
        'login-signin-on': state === 'signin',
        'login-signup-on': state === 'signup',
        'login-signin-student-on': state === 'signinstudent',
        'login-signin-sysadmin-on': state === 'signinsysadmin',
        'login-forgot-on': state === 'forgot',
      }"
    >
      <!--begin::Aside-->
      <div
        class="login-aside d-flex flex-column flex-row-auto"
        style="background-color: #00b395"
      >
        <div class="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <a href="javascript:;" class="text-center mb-10">
            <img
              src="~assets/media/logos/logo-nutrium-white.png"
              class="max-h-70px"
              alt=""
            />
          </a>
          <h3
            class="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
            style="color: #e0faf1"
          >
            Quản lý dinh dưỡng học đường
          </h3>
        </div>
        <div
          class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>
      </div>
      <!--begin::Aside-->

      <!--begin::Content-->
      <div
        class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto"
      >
        <div class="d-flex flex-column-fluid flex-center">
          <!--begin::Signin-->
          <auth-login @showForm="showForm"></auth-login>
          <!--end::Signin-->

          <!--begin::Signin-->
          <auth-register @showForm="showForm"></auth-register>
          <!--end::Signin-->

          <!--begin::Signin student-->
          <auth-login-student @showForm="showForm"></auth-login-student>
          <!--end::Signin student-->

          <!--begin::Signin sysadmin-->
          <auth-login-sys-admin @showForm="showForm"></auth-login-sys-admin>
          <!--end::Signin sysadmin-->

          <!--begin::Forgot-->
          <auth-forgot-password @showForm="showForm"></auth-forgot-password>
          <!--end::Forgot-->
        </div>
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<script>
import KTUtil from '@/assets/js/components/util'

export default {
  name: 'LoginPage',
  auth: 'guest',
  layout: 'blank',
  data() {
    return {
      state: 'signin',
    }
  },
  head() {
    return {
      title: 'Login',
    }
  },
  computed: {
    backgroundImage() {
      return require('~/assets/media/svg/illustrations/progress2.svg')
    },
  },
  methods: {
    showForm(form) {
      this.state = form
      const formName = 'kt_login_' + form + '_form'
      KTUtil.animateClass(
        KTUtil.getById(formName),
        'animate__animated animate__backInUp'
      )
    },
  },
}
</script>

<style lang="scss">
@import '~assets/sass/pages/login/login-1.scss';
</style>
