<template>
  <!--begin::Card-->
  <div class="d-xl-flex d-block">
    <div
      id="kt_profile_aside"
      class="col-xxl-3 col-xl-4 col-12 mb-xl-0 mb-4 h-100"
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
              class="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
              style="cursor: pointer"
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

    <div class="col-xxl-9 col-xl-8 col-12">
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
              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Ngày sinh</label
                >
                <div class="col-lg-9 col-xl-9">
                  <el-date-picker
                    v-model="form.dateOfBirth"
                    :picker-options="pickerOption"
                    class="custom-size-datepicker-info"
                    format="dd/MM/yyyy"
                    placeholder="Ngày sinh"
                    size="large"
                    type="date"
                  ></el-date-picker>
                </div>
              </div>
              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Chiều cao (cm)</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="fullName"
                    v-model="form.height"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Chiều cao"
                    type="text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Cân nặng (kg)</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="fullName"
                    v-model="form.weight"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Cân nặng"
                    type="text"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                >
                  Chỉ số BMI
                </label>
                <div class="col-xl-2 col-lg-4">
                  <input
                    ref="bmi"
                    :value="form.bmi"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    placeholder="Cân nặng"
                    type="text"
                  />
                </div>
                <div class="col-xl-4 col-lg-5 mt-lg-0 mt-4">
                  <input
                    ref="bmiResult"
                    :value="bmiResult"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    placeholder="Không xác định"
                    type="text"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Nguy cơ phát triển bệnh</label
                >
                <div class="col-xl-6 col-lg-9">
                  <input
                    ref="diseaseRisk"
                    :value="diseaseRisk"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    placeholder="Không xác định"
                    type="text"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                >
                  Giới tính
                </label>
                <div class="col-lg-9 col-xl-6">
                  <b-form-group v-slot="{ ariaDescribedby }" label="">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="form.gender"
                      :aria-describedby="ariaDescribedby"
                      :options="genderOptions"
                      name="radio-options"
                    ></b-form-radio-group>
                  </b-form-group>
                </div>
              </div>

              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                >
                  Hoạt động thể lực
                </label>
                <div class="col-lg-9 col-xl-6">
                  <b-form-group v-slot="{ ariaDescribedby2 }" label="">
                    <b-form-radio-group
                      id="radio-group-2"
                      v-model="form.activityType"
                      :aria-describedby="ariaDescribedby2"
                      :options="activityTypeOptions"
                      name="radio-options2"
                    ></b-form-radio-group>
                  </b-form-group>
                </div>
              </div>

              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >KNNL (kcal)</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="school"
                    v-model="form.rcmCalories"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    type="text"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Mã học sinh</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="school"
                    :value="student.studentId"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    type="text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Tên trường</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="school"
                    :value="student.school.name"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    type="text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  class="col-xl-3 col-lg-3 col-form-label font-weight-bold text-lg-right text-left"
                  >Lớp</label
                >
                <div class="col-lg-9 col-xl-6">
                  <input
                    ref="school"
                    :value="student.class.name"
                    class="form-control form-control-lg form-control-solid"
                    disabled
                    type="text"
                  />
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
import { convertTimeStampsToString } from '~/services/convertTimeStamps.service'
import { FEMALE, MALE } from '~/constants/gender.constant'
import {
  ACTIVITY,
  ACTIVITY_TYPE,
  HEAVY,
  LIGHT,
  MODERATE,
  NONE,
} from '~/constants/activity-type.constant'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'
import { ERROR_CODES } from '~/constants/error-code.constants'

export default {
  name: 'StudentPersonalInformation',
  mixins: [NotifyMixin],
  data() {
    return {
      default_photo: 'media/students/blank.png',
      current_photo: null,
      student: cloneDeep(this.$auth.user),
      form: {
        fullName: this.$auth.user.fullName,
        dateOfBirth: new Date(this.$auth.user.dateOfBirth * 1000),
        weight: this.$auth.user.weight.toString(),
        height: this.$auth.user.height.toString(),
        gender: this.$auth.user.gender,
        activityType: this.$auth.user.activityType,
        rcmCalories: this.$auth.user.rcmCalories,
        bmi: this.$auth.user.bmi,
      },
      selectedGender: this.$auth.user.gender,
      genderOptions: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
      selectedActivityType: this.$auth.user.activityType,
      // activityTypeOptions: [
      //   { text: 'Không (Không luyện tập thể dục)', value: 'none' },
      //   { text: 'Nhẹ (Tập thể dục nhẹ nhàng 1-3 ngày/tuần)', value: 'light' },
      //   { text: 'Trung bình (Tập thể dục 3-5 ngày/tuần)', value: 'moderate' },
      //   { text: 'Nặng (Tập thể dục nhiều 6-7 ngày/tuần)', value: 'heavy' },
      // ],
      bmiResult: '',
      diseaseRisk: '',
      isLoading: false,
      delay: null,
      pickerOption: {
        firstDayOfWeek: 1,
      },
    }
  },

  computed: {
    ROLES() {
      return ROLES
    },

    activityTypeOptions() {
      return [
        { text: ACTIVITY.get(NONE), value: NONE },
        { text: ACTIVITY.get(LIGHT), value: LIGHT },
        { text: ACTIVITY.get(MODERATE), value: MODERATE },
        { text: ACTIVITY.get(HEAVY), value: HEAVY },
      ]
    },
  },

  watch: {
    'form.dateOfBirth': {
      handler(newVal, oldVal) {
        if (newVal && typeof newVal !== 'number') {
          this.form.rcmCalories = this.calculateRcmCalories()
        }
      },
      deep: true,
    },

    'form.weight': {
      handler(newVal, oldVal) {
        this.form.rcmCalories = this.calculateRcmCalories()
        this.form.bmi = this.calculateBMI()
        this.calculateBMIResult()
      },
      deep: true,
    },

    'form.height': {
      handler(newVal, oldVal) {
        this.form.rcmCalories = this.calculateRcmCalories()
        this.form.bmi = this.calculateBMI()
        this.calculateBMIResult()
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

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))
  },

  mounted() {
    this.calculateBMIResult()
  },

  methods: {
    convertTimeStampsToString,
    async save() {
      // set spinner to submit button
      const submitButton = this.$refs.kt_save_changes

      if (
        this.form.fullName === this.student.fullName &&
        this.form.dateOfBirth.getTime() ===
          new Date(this.student.dateOfBirth * 1000).getTime() &&
        this.form.weight === this.student.weight.toString() &&
        this.form.height === this.student.height.toString() &&
        this.form.gender === this.student.gender &&
        this.form.activityType === this.student.activityType
      ) {
        return
      }

      this.isLoading = true
      await this.delay(500)

      try {
        this.form.dateOfBirth = this.form.dateOfBirth.getTime() / 1000
        submitButton.classList.add('spinner', 'spinner-light', 'spinner-right')
        const { data } = await this.$axios.post(
          'students/update-info',
          this.form
        )

        this.student.fullName = data.fullName
        this.student.dateOfBirth = data.dateOfBirth
        this.student.weight = data.weight.toString()
        this.student.height = data.height.toString()
        this.student.gender = data.gender
        this.student.activityType = data.activityType
        this.form.dateOfBirth = new Date(data.dateOfBirth * 1000)

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
      this.form.fullName = this.student.fullName
      this.form.dateOfBirth = new Date(this.student.dateOfBirth * 1000)
      this.form.weight = this.student.weight
      this.form.height = this.student.height
      this.form.gender = this.student.gender
      this.form.activityType = this.student.activityType
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

    calculateBMI() {
      return this.form.height && this.form.weight
        ? Math.round(
            ((this.form.weight * 10000) /
              (this.form.height * this.form.height)) *
              10
          ) / 10
        : Number(0).toPrecision(2)
    },

    calculateBMIResult() {
      if (this.form.bmi) {
        if (this.form.bmi <= 24.9 && this.form.bmi >= 18.5) {
          this.bmiResult = 'Bình thường'
          this.diseaseRisk = 'Trung bình'
        } else if (this.form.bmi < 18.5 && this.form.bmi > 0) {
          this.bmiResult = 'Gầy'
          this.diseaseRisk = 'Thấp'
        } else if (this.form.bmi >= 25 && this.form.bmi <= 29.9) {
          this.bmiResult = 'Hơi béo'
          this.diseaseRisk = 'Cao'
        } else if (this.form.bmi >= 30 && this.form.bmi <= 34.9) {
          this.bmiResult = 'Béo phì cấp độ 1'
          this.diseaseRisk = 'Cao'
        } else if (this.form.bmi >= 35 && this.form.bmi <= 39.9) {
          this.bmiResult = 'Béo phì cấp độ 2'
          this.diseaseRisk = 'Rất cao'
        } else if (this.form.bmi >= 40) {
          this.bmiResult = 'Béo phì cấp độ 3'
          this.diseaseRisk = 'Nguy hiểm'
        } else {
          this.bmiResult = 'Không xác định'
          this.diseaseRisk = 'Không xác định'
        }
      } else {
        this.bmiResult = 'Không xác định'
        this.diseaseRisk = 'Không xác định'
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
                  new Date().getFullYear() - this.form.dateOfBirth.getFullYear()
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
                  new Date().getFullYear() - this.form.dateOfBirth.getFullYear()
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
<style lang="scss">
.custom-size-datepicker-info {
  input {
    padding-top: 21px;
    padding-bottom: 21px;
    font-size: 14px;
    border-radius: 12px;
    background-color: #f4f6f9;
  }
}
</style>
