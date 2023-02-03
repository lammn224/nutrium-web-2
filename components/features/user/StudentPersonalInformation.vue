<template>
  <!--begin::Card-->
  <div class="d-flex flex-row">
    <div
      id="kt_profile_aside"
      class="flex-row-auto offcanvas-mobile w-300px w-xl-350px h-100"
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
                >{{ student.fullName }}</a
              >
              <div class="text-muted">{{ ROLES.get(student.role) }}</div>
              <div class="mt-2">
                <div
                  class="d-flex align-items-center justify-content-between mb-2"
                >
                  <span class="font-weight-bold mr-2">Ngày sinh:</span>
                  <span class="text-muted">{{
                    convertTimeStamps(student.dateOfBirth)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <!--end::User-->

          <!--begin::Contact-->
          <div class="py-9">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Họ và tên:</span>
              <a class="text-muted text-hover-primary">{{
                student.fullName
              }}</a>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Mã học sinh:</span>
              <span class="text-muted">{{ student.studentId }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Lớp:</span>
              <span class="text-muted">{{ student.class.name }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="font-weight-bold mr-2">Trường:</span>
              <span class="text-muted">{{ student.school.name }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="font-weight-bold mr-2">Mã trường:</span>
              <span class="text-muted">{{ student.school.code }}</span>
            </div>
          </div>
          <!--end::Contact-->
        </div>
      </div>
    </div>

    <div class="flex-row-fluid ml-lg-8">
      <div class="card card-custom mb-5">
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
                  :value="student.fullName"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Ngày sinh</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="fullName"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="Ngày sinh"
                  :value="convertTimeStamps(student.dateOfBirth)"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Mã học sinh</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="school"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  disabled
                  :value="student.studentId"
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
                  :value="student.school.name"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Lớp</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="school"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  disabled
                  :value="student.class.name"
                />
              </div>
            </div>
          </div>
          <!--end::Body-->
        </form>
        <!--end::Form-->
      </div>

      <div class="card card-custom">
        <!--begin::Header-->
        <div class="card-header py-3">
          <div class="card-title align-items-start flex-column">
            <h3 class="card-label font-weight-bolder text-dark">
              Thông tin liên hệ
            </h3>
            <span class="text-muted font-weight-bold font-size-sm mt-1">
              Thông tin liên hệ của phụ huynh
            </span>
          </div>
        </div>
        <!--end::Header-->
        <!--begin::Form-->
        <form class="form">
          <div class="card-body">
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Phụ huynh</label
              >
              <div class="col-lg-9 col-xl-6">
                <div class="input-group input-group-lg input-group-solid">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="flaticon2-user"></i>
                    </span>
                  </div>
                  <input
                    ref="parents"
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Phụ huynh"
                    disabled
                    :value="student.parents.fullName"
                  />
                </div>
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
                    disabled
                    :value="student.parents.phoneNumber"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import cloneDeep from 'lodash/cloneDeep'
import { ROLES } from '../../../constants/role.constant'
import { convertTimeStamps } from '~/services/convertTimeStamps.service'

export default {
  name: 'StudentPersonalInformation',
  data() {
    return {
      default_photo: 'media/students/blank.png',
      current_photo: null,
      student: cloneDeep(this.$auth.user),
    }
  },

  computed: {
    ROLES() {
      return ROLES
    },
  },

  mounted() {
    this.current_photo = this.student.photo
  },

  methods: {
    convertTimeStamps,
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
      this.$refs.fullName.value = this.student.fullName
      this.$refs.school.value = this.student.school.name
      this.$refs.phoneNumber.value = this.student.phoneNumber
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
