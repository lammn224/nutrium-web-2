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
              <div class="text-muted">{{ user.role }}</div>
              <div class="mt-2">
                <a
                  class="btn btn-sm btn-primary font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
                  >Chat</a
                >
                <a
                  class="btn btn-sm btn-success font-weight-bold py-2 px-3 px-xxl-5 my-1"
                  >Follow</a
                >
              </div>
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
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="Họ tên"
                  :value="user.fullName"
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
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Số điện thoại"
                    :value="user.phoneNumber"
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
// import { mapGetters } from "vuex";
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'PersonalInformation',
  data() {
    return {
      default_photo: 'media/users/blank.png',
      current_photo: null,
      user: cloneDeep(this.$auth.user),
    }
  },

  computed: {},

  mounted() {
    this.current_photo = this.user.photo
  },

  methods: {
    save() {
      // set spinner to submit button
      const submitButton = this.$refs.kt_save_changes
      submitButton.classList.add('spinner', 'spinner-light', 'spinner-right')

      // dummy delay
      setTimeout(() => {
        // send update request

        submitButton.classList.remove(
          'spinner',
          'spinner-light',
          'spinner-right'
        )
      }, 2000)
    },
    cancel() {
      this.$refs.fullName.value = this.user.fullName
      this.$refs.school.value = this.user.school.name
      this.$refs.phoneNumber.value = this.user.phoneNumber
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
  },
}
</script>
