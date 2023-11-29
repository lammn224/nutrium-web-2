<template>
  <!--begin::Card-->
  <div class="d-xl-flex d-block">
    <div
      id="kt_profile_aside"
      class="col-xxl-3 col-xl-4 col-12 mb-xl-0 mb-4 pl-0 h-100"
    >
      <div class="card card-custom card-stretch">
        <div class="card-body pt-4">
          <!--begin::User-->
          <div class="d-flex align-items-center">
            <div
              class="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center"
            >
              <div class="symbol-label">
                <img
                  alt=""
                  class="symbol-label"
                  src="~/assets/media/users/blank.png"
                />
              </div>
              <i class="symbol-badge bg-success"></i>
            </div>
            <div>
              <a
                class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
                >{{ user.fullName }}</a
              >
              <div class="text-muted">{{ ROLES.get(user.role) }}</div>
            </div>
          </div>
          <!--end::User-->

          <!--begin::Contact-->
          <div class="py-9">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Họ và tên:</span>
              <a class="text-muted text-hover-primary">{{ user.fullName }}</a>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Số điện thoại:</span>
              <span class="text-muted">{{ user.phoneNumber }}</span>
            </div>
            <div
              v-if="user.school"
              class="d-flex align-items-center justify-content-between mb-2"
            >
              <span class="font-weight-bold mr-2">Tên trường:</span>
              <span class="text-muted">{{ user.school.name }}</span>
            </div>
            <div
              v-if="user.school"
              class="d-flex align-items-center justify-content-between"
            >
              <span class="font-weight-bold mr-2">Mã trường:</span>
              <span class="text-muted">{{ user.school.code }}</span>
            </div>
          </div>
          <!--end::Contact-->
        </div>
      </div>
    </div>

    <div class="col-xxl-9 col-xl-8 col-12 pl-xl-2 pl-0">
      <div class="card card-custom">
        <!--begin::Header-->
        <div class="card-header py-3">
          <div class="card-title align-items-start flex-column">
            <h3 class="card-label font-weight-bolder text-dark">
              Thông tin cá nhân
            </h3>
            <span class="text-muted font-weight-bold font-size-sm mt-1"
              >Cập nhật thông tin cá nhân</span
            >
          </div>
          <div class="card-toolbar">
            <button
              ref="kt_save_changes"
              class="btn btn-primary mr-2"
              type="reset"
              @click="save()"
            >
              Lưu thay đổi
            </button>
            <button class="btn btn-secondary" type="reset" @click="cancel()">
              Huỷ bỏ
            </button>
          </div>
        </div>
        <!--end::Header-->
        <!--begin::Form-->
        <form class="form">
          <!--begin::Body-->
          <b-overlay
            :show="isLoading"
            rounded="sm"
            spinner-small
            spinner-type="grow"
            spinner-variant="primary"
          >
            <div class="card-body">
              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Họ tên</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="fullName"
                    v-model="form.fullName"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Họ tên"
                    type="text"
                  />
                </div>
              </div>
              <div v-if="user.school" class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Tên trường</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="school"
                    :value="user.school.name"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    type="text"
                  />
                </div>
              </div>
              <div class="row">
                <label class="col-xl-3"></label>
                <div class="col-lg-9 col-xl-6">
                  <h5 class="font-weight-bold mt-10 mb-6">Thông tin liên hệ</h5>
                </div>
              </div>
              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Số điện thoại</label
                >
                <div class="col-lg-9 col-xl-6">
                  <div class="input-group input-group-lg input-group-solid">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="flaticon2-phone"></i>
                      </span>
                    </div>
                    <input
                      ref="phoneNumber"
                      v-model="form.phoneNumber"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Số điện thoại"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </b-overlay>
          <!--end::Body-->
        </form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { ROLES } from '~/constants/role.constant'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'
import { ERROR_CODES } from '~/constants/error-code.constants'

export default {
  name: 'PersonalInformation',
  mixins: [NotifyMixin],
  data() {
    return {
      default_photo: 'media/users/blank.png',
      current_photo: null,
      user: cloneDeep(this.$auth.user),
      form: {
        fullName: this.$auth.user.fullName,
        phoneNumber: this.$auth.user.phoneNumber,
      },
      isLoading: false,
      delay: null,
    }
  },

  computed: {
    ROLES() {
      return ROLES
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))
  },

  mounted() {
    this.current_photo = this.user.photo
  },

  methods: {
    async save() {
      const submitButton = this.$refs.kt_save_changes

      if (
        this.form.fullName === this.user.fullName &&
        this.form.phoneNumber === this.user.phoneNumber
      ) {
        return
      }

      this.isLoading = true
      await this.delay(500)

      try {
        submitButton.classList.add('spinner', 'spinner-light', 'spinner-right')
        const { data } = await this.$axios.post(
          'school-users/update-info',
          this.form
        )

        this.user.fullName = data.fullName
        this.user.phoneNumber = data.phoneNumber

        setTimeout(() => {
          submitButton.classList.remove(
            'spinner',
            'spinner-light',
            'spinner-right'
          )
        }, 1000)
        this.$notifySuccess(this.notifyTitle, 'Cập nhật thông tin thành công')
      } catch (e) {
        this.processError(e)
        submitButton.classList.remove(
          'spinner',
          'spinner-light',
          'spinner-right'
        )
      } finally {
        this.isLoading = false
      }
    },

    cancel() {
      this.form.fullName = this.user.fullName
      this.form.phoneNumber = this.user.phoneNumber
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

    onFileChange(e) {
      const file = e.target.files[0]

      if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = (event) => {
          this.current_photo = event.target.result
        }

        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },

    getDetailsStudent(id) {
      this.$router.push({ path: `/student/${id}` })
    },
  },
}
</script>
