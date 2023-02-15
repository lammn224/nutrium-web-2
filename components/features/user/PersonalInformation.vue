<template>
  <!--begin::Card-->
  <div class="d-flex flex-row">
    <div
      id="kt_profile_aside"
      class="flex-row-auto offcanvas-mobile w-300px w-xl-350px"
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
                  class="symbol-label"
                  src="~/assets/media/users/300_21.jpg"
                  alt=""
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
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Tên trường:</span>
              <span class="text-muted">{{ user.school.name }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="font-weight-bold mr-2">Mã trường:</span>
              <span class="text-muted">{{ user.school.code }}</span>
            </div>
          </div>
          <!--end::Contact-->

          <!--begin::Student-->
          <div v-if="$auth.user.child">
            <a
              style="cursor: pointer"
              class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
              @click="getDetailsStudent($auth.user.child._id)"
            >
              Thông tin học sinh
            </a>
            <div class="pt-2">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold mr-2">Họ và tên học sinh:</span>
                <a class="text-muted text-hover-primary">{{
                  user.child.fullName
                }}</a>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold mr-2">Mã học sinh:</span>
                <span class="text-muted">{{ user.child.studentId }}</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold mr-2">Lớp:</span>
                <span class="text-muted">{{ user.child.class.name }}</span>
              </div>
            </div>
          </div>

          <!--end::Student-->
        </div>
      </div>
    </div>

    <div class="flex-row-fluid ml-lg-8">
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
              type="reset"
              class="btn btn-primary mr-2"
              @click="save()"
            >
              Lưu thay đổi
            </button>
            <button type="reset" class="btn btn-secondary" @click="cancel()">
              Huỷ bỏ
            </button>
          </div>
        </div>
        <!--end::Header-->
        <!--begin::Form-->
        <form class="form">
          <!--begin::Body-->
          <div class="card-body">
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Họ tên</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="fullName"
                  v-model="form.fullName"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="Họ tên"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Tên trường</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="school"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  disabled
                  :value="user.school.name"
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
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
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
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Số điện thoại"
                  />
                </div>
              </div>
            </div>
          </div>
          <!--end::Body-->
        </form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { ROLES } from '../../../constants/role.constant'

export default {
  name: 'PersonalInformation',
  data() {
    return {
      default_photo: 'media/users/blank.png',
      current_photo: null,
      user: cloneDeep(this.$auth.user),
      form: {
        fullName: this.$auth.user.fullName,
        phoneNumber: this.$auth.user.phoneNumber,
      },
    }
  },

  computed: {
    ROLES() {
      return ROLES
    },
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
        this.$notifyUpdateInfoSuccess()
      } catch (e) {
        this.processError(e)
        submitButton.classList.remove(
          'spinner',
          'spinner-light',
          'spinner-right'
        )
      }
    },

    cancel() {
      this.form.fullName = this.user.fullName
      this.form.phoneNumber = this.user.phoneNumber
    },

    processError(e) {
      if (e.response) {
        if (e.status !== 422) {
          this.$notifyTryAgain()
        }
      } else {
        this.$notifyTryAgain()
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
