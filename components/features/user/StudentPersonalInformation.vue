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
                    convertTimeStampsToString(student.dateOfBirth)
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

          <!--begin::Parents-->
          <div>
            <a
              style="cursor: pointer"
              class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
            >
              Thông tin liên hệ
            </a>
            <div class="pt-2">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold mr-2">Phụ huynh:</span>
                <a class="text-muted text-hover-primary">{{
                  student.parents.fullName
                }}</a>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="font-weight-bold mr-2">Số điện thoại:</span>
                <span class="text-muted">{{
                  student.parents.phoneNumber
                }}</span>
              </div>
            </div>
          </div>
          <!--end::Parents-->
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
                  v-model="form.fullName"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="Họ tên"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Ngày sinh</label
              >
              <div class="col-lg-9 col-xl-6">
                <!--                <input-->
                <!--                  ref="fullName"-->
                <!--                  v-model="form.dateOfBirth"-->
                <!--                  class="form-control form-control-lg form-control-solid"-->
                <!--                  type="text"-->
                <!--                  placeholder="Ngày sinh"-->
                <!--                />-->

                <b-form-datepicker
                  v-model="form.dateOfBirth"
                  :date-format-options="{
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }"
                  locale="vi"
                ></b-form-datepicker>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Chiều cao (cm)</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="fullName"
                  v-model="form.height"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="Chiều cao"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >Cân nặng (kg)</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="fullName"
                  v-model="form.weight"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  placeholder="Cân nặng"
                />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right">
                Giới tính
              </label>
              <div class="col-lg-9 col-xl-6">
                <b-form-group v-slot="{ ariaDescribedby }" label="">
                  <b-form-radio-group
                    id="radio-group-1"
                    v-model="form.gender"
                    :options="genderOptions"
                    :aria-describedby="ariaDescribedby"
                    name="radio-options"
                  ></b-form-radio-group>
                </b-form-group>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right">
                Hoạt động thể lực
              </label>
              <div class="col-lg-9 col-xl-6">
                <b-form-group v-slot="{ ariaDescribedby2 }" label="">
                  <b-form-radio-group
                    id="radio-group-2"
                    v-model="form.activityType"
                    :options="activityTypeOptions"
                    :aria-describedby="ariaDescribedby2"
                    name="radio-options2"
                  ></b-form-radio-group>
                </b-form-group>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-xl-3 col-lg-3 col-form-label text-right"
                >KNNL (kcal)</label
              >
              <div class="col-lg-9 col-xl-6">
                <input
                  ref="school"
                  v-model="form.rcmCalories"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  disabled
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
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { ROLES } from '../../../constants/role.constant'
import {
  convertStringDatePickerToTimeStamps,
  convertTimeStampsToDatePickerString,
  convertTimeStampsToString,
} from '~/services/convertTimeStamps.service'
import { FEMALE, MALE } from '~/constants/gender.constant'
import { ACTIVITY_TYPE } from '~/constants/activity-type.constant'
export default {
  name: 'StudentPersonalInformation',
  data() {
    return {
      default_photo: 'media/students/blank.png',
      current_photo: null,
      student: cloneDeep(this.$auth.user),
      form: {
        fullName: this.$auth.user.fullName,
        dateOfBirth: convertTimeStampsToDatePickerString(
          this.$auth.user.dateOfBirth
        ),
        weight: this.$auth.user.weight,
        height: this.$auth.user.height,
        gender: this.$auth.user.gender,
        activityType: this.$auth.user.activityType,
        rcmCalories: this.$auth.user.rcmCalories,
      },
      selectedGender: this.$auth.user.gender,
      genderOptions: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
      selectedActivityType: this.$auth.user.activityType,
      activityTypeOptions: [
        { text: 'Không', value: 'none' },
        { text: 'Nhẹ', value: 'light' },
        { text: 'Trung bình', value: 'moderate' },
        { text: 'Nặng', value: 'heavy' },
      ],
    }
  },

  computed: {
    ROLES() {
      return ROLES
    },
  },

  watch: {
    'form.dateOfBirth': {
      handler(newVal, oldVal) {
        if (typeof newVal === 'string') {
          this.form.rcmCalories = this.calculateRcmCalories()
        }
      },
      deep: true,
    },

    'form.weight': {
      handler(newVal, oldVal) {
        this.form.rcmCalories = this.calculateRcmCalories()
      },
      deep: true,
    },

    'form.height': {
      handler(newVal, oldVal) {
        this.form.rcmCalories = this.calculateRcmCalories()
      },
      deep: true,
    },

    'form.gender': {
      handler(newVal, oldVal) {
        this.form.rcmCalories = this.calculateRcmCalories()
      },
      deep: true,
    },

    'form.activityType': {
      handler(newVal, oldVal) {
        this.form.rcmCalories = this.calculateRcmCalories()
      },
      deep: true,
    },
  },

  mounted() {
    this.current_photo = this.student.photo
  },

  methods: {
    convertTimeStampsToString,
    async save() {
      // set spinner to submit button
      const submitButton = this.$refs.kt_save_changes

      if (
        this.form.fullName === this.student.fullName &&
        this.form.dateOfBirth ===
          convertTimeStampsToString(this.student.dateOfBirth) &&
        // eslint-disable-next-line eqeqeq
        this.form.weight == this.student.weight &&
        // eslint-disable-next-line eqeqeq
        this.form.height == this.student.height &&
        // eslint-disable-next-line eqeqeq
        this.form.gender == this.student.gender &&
        this.form.activityType === this.student.activityType
      ) {
        return
      }

      try {
        this.form.dateOfBirth = new Date(this.form.dateOfBirth).getTime() / 1000
        submitButton.classList.add('spinner', 'spinner-light', 'spinner-right')
        const { data } = await this.$axios.post(
          'students/update-info',
          this.form
        )

        this.student.fullName = data.fullName
        this.student.dateOfBirth = data.dateOfBirth
        this.student.weight = data.weight
        this.student.height = data.height
        this.student.gender = data.gender
        this.student.activityType = data.activityType
        this.form.dateOfBirth = convertTimeStampsToDatePickerString(
          data.dateOfBirth
        )

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
      this.form.fullName = this.student.fullName
      this.form.dateOfBirth = convertTimeStampsToDatePickerString(
        this.student.dateOfBirth
      )
      this.form.weight = this.student.weight
      this.form.height = this.student.height
      this.form.gender = this.student.gender
      this.form.activityType = this.student.activityType
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

    calculateRcmCalories() {
      const gender = this.form.gender

      switch (gender) {
        case MALE:
          return Math.floor(
            (66.47 +
              13.75 * this.form.weight +
              5.003 * this.form.height -
              6.755 *
                parseInt(
                  new Date().getFullYear() -
                    new Date(
                      convertStringDatePickerToTimeStamps(
                        this.form.dateOfBirth
                      ) * 1000
                    ).getFullYear()
                )) *
              ACTIVITY_TYPE.get(this.form.activityType)
          )

        case FEMALE:
          return Math.floor(
            (655.1 +
              9.563 * this.form.weight +
              1.85 * this.form.height -
              4.676 *
                parseInt(
                  new Date().getFullYear() -
                    new Date(
                      convertStringDatePickerToTimeStamps(
                        this.form.dateOfBirth
                      ) * 1000
                    ).getFullYear()
                )) *
              ACTIVITY_TYPE.get(this.form.activityType)
          )

        default:
          break
      }
    },
  },
}
</script>
