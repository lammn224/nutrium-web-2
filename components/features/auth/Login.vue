<template>
  <div class="login-form login-signin">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        id="kt_login_signin_form"
        class="form"
        novalidate="novalidate"
        method="post"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div class="pb-13 pt-lg-0 pt-5">
          <h3 class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
            Chào mừng tới Nutrium
          </h3>
          <span class="text-muted font-weight-bold font-size-h4">
            Chưa có tài khoản?
            <a
              id="kt_login_signup"
              class="text-primary font-weight-bolder"
              tabindex="4"
              style="cursor: pointer"
              @click="showForm('signup')"
            >
              Đăng ký
            </a>

            <div class="pt-13 pt-5">
              <a
                id="kt_login_siginstudent"
                href="javascript:;"
                class="text-primary font-weight-bolder"
                tabindex="4"
                @click="showForm('signinstudent')"
              >
                Đăng nhập với vai trò học sinh
              </a>
            </div>
          </span>
        </div>

        <h4 v-if="error" class="text-danger">
          Thông tin đăng nhập không đúng!
        </h4>

        <ValidationProvider
          v-slot="{ errors }"
          name="Mã trường"
          rules="required"
        >
          <div class="form-group">
            <label class="font-size-h6 font-weight-bolder text-dark"
              >Mã trường</label
            >
            <div
              id="school-code-input-group"
              label="schoolCode"
              label-for="school-code-input-group"
            >
              <input
                ref="schoolCode"
                v-model="schoolCode"
                placeholder="Nhập mã trường..."
                class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                type="text"
                name="schoolCode"
                tabindex="1"
                @blur="getSchool"
              />
            </div>

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

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
                placeholder="Nhập số điện thoại của bạn..."
                class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                type="text"
                name="phoneNumber"
                tabindex="1"
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
              <a
                id="kt_login_forgot"
                href="javascript:;"
                class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                tabindex="4"
                @click="showForm('forgot')"
                >Quên mật khẩu ?</a
              >
            </div>
            <div
              id="password-input-group"
              label=""
              label-for="password-input-group"
            >
              <input
                ref="password"
                v-model="password"
                class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                type="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn..."
                autocomplete="off"
                tabindex="2"
              />
            </div>

            <p class="text-danger mt-1">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <div class="pb-lg-0 pb-5">
          <button
            ref="kt_login_signin_submit"
            class="btn btn-block btn-primary font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
            :class="[isLoading ? 'spinner spinner-white spinner-right' : null]"
            :disabled="isLoading"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AuthLogin',
  data() {
    return {
      phoneNumber: '',
      password: '',
      schoolCode: '',
      isLoading: false,
      error: null,
    }
  },

  computed: {
    ...mapGetters({
      school: 'school/school',
    }),
  },

  methods: {
    ...mapActions({
      setSchool: 'school/setSchool',
    }),

    async onSubmit() {
      this.error = null
      try {
        this.isLoading = true

        await this.$auth.loginWith('localUser', {
          data: {
            phoneNumber: this.phoneNumber,
            password: this.password,
            school: this.school._id,
          },
        })

        await this.$auth.fetchUser()
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
      this.schoolCode = ''
      this.$refs.observer.reset()
      this.$emit('showForm', form)
    },

    async getSchool() {
      try {
        const { data } = await this.$axios.get('schools/' + this.schoolCode)
        await this.setSchool(data)
      } catch (e) {
        // this.error = e
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
