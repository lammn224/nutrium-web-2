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

    <div class="flex-row-fluid ml-lg-8">
      <b-card class="card-tabs-custom" no-body>
        <b-tabs active-nav-item-class="font-weight-bold text-primary" card>
          <b-tab title="Thông tin cá nhân">
            <div class="card card-custom mb-5">
              <!--begin::Header-->
              <div class="card-header py-3">
                <div class="card-title align-items-start flex-column">
                  <h3 class="card-label font-weight-bolder text-dark">
                    Thông tin cá nhân
                  </h3>
                  <span class="text-muted font-weight-bold font-size-sm mt-1"
                    >Thông tin cá nhân học sinh</span
                  >
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
                        :value="student.fullName"
                        class="form-control form-control-lg form-control-solid"
                        disabled
                        placeholder="Họ tên"
                        type="text"
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
                        :value="convertTimeStampsToString(student.dateOfBirth)"
                        class="form-control form-control-lg form-control-solid"
                        disabled
                        placeholder="Ngày sinh"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-xl-3 col-lg-3 col-form-label text-right"
                      >Chiều cao (cm)</label
                    >
                    <div class="col-lg-9 col-xl-6">
                      <input
                        ref="fullName"
                        :value="student.height"
                        class="form-control form-control-lg form-control-solid"
                        disabled
                        placeholder="Chiều cao"
                        type="text"
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
                        :value="student.weight"
                        class="form-control form-control-lg form-control-solid"
                        disabled
                        placeholder="Cân nặng"
                        type="text"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-xl-3 col-lg-3 col-form-label text-right"
                      >Chỉ số BMI</label
                    >
                    <div class="col-lg-4 col-xl-2">
                      <input
                        ref="bmi"
                        :value="student.bmi"
                        class="form-control form-control-lg form-control-solid"
                        disabled
                        placeholder="Cân nặng"
                        type="text"
                      />
                    </div>
                    <div class="col-lg-4 col-xl-4">
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
                    <label class="col-xl-3 col-lg-3 col-form-label text-right"
                      >Nguy cơ phát triển bệnh</label
                    >
                    <div class="col-lg-9 col-xl-6">
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
                    <label class="col-xl-3 col-lg-3 col-form-label text-right">
                      Giới tính
                    </label>
                    <div class="col-lg-9 col-xl-6">
                      <b-form-group v-slot="{ ariaDescribedby }" label="">
                        <b-form-radio-group
                          id="radio-group-1"
                          v-model="selectedGender"
                          :aria-describedby="ariaDescribedby"
                          :options="genderOptions"
                          disabled
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
                          v-model="selectedActivityType"
                          :aria-describedby="ariaDescribedby2"
                          :options="activityTypeOptions"
                          disabled
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
                        :value="student.rcmCalories"
                        class="form-control form-control-lg form-control-solid"
                        disabled
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <!--end::Body-->
              </form>
              <!--end::Form-->
            </div>
          </b-tab>
          <b-tab title="Thống kê">
            <div>
              <student-statistic :student="student"></student-statistic>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ROLES } from '~/constants/role.constant'
import { convertTimeStampsToString } from '~/services/convertTimeStamps.service'
import {
  ACTIVITY,
  HEAVY,
  LIGHT,
  MODERATE,
  NONE,
} from '~/constants/activity-type.constant'

export default {
  name: 'StudentDetail',
  props: {
    student: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      default_photo: 'media/students/blank.png',
      meals: [],
      selectedGender: this.student.gender,
      genderOptions: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
      selectedActivityType: this.student.activityType,
      // activityTypeOptions: [
      //   { text: 'Không (Không luyện tập thể dục)', value: 'none' },
      //   { text: 'Nhẹ (Tập thể dục nhẹ nhàng 1-3 ngày/tuần)', value: 'light' },
      //   { text: 'Trung bình (Tập thể dục 3-5 ngày/tuần)', value: 'moderate' },
      //   { text: 'Nặng (Tập thể dục nặng 6-7 ngày/tuần)', value: 'heavy' },
      // ],
      bmiResult: '',
      diseaseRisk: '',
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

  mounted() {
    if (this.student.bmi) {
      if (this.student.bmi <= 24.9 && this.student.bmi >= 18.5) {
        this.bmiResult = 'Bình thường'
        this.diseaseRisk = 'Trung bình'
      } else if (this.student.bmi < 18.5 && this.student.bmi > 0) {
        this.bmiResult = 'Gầy'
        this.diseaseRisk = 'Thấp'
      } else if (this.student.bmi >= 25 && this.student.bmi <= 29.9) {
        this.bmiResult = 'Hơi béo'
        this.diseaseRisk = 'Cao'
      } else if (this.student.bmi >= 30 && this.student.bmi <= 34.9) {
        this.bmiResult = 'Béo phì cấp độ 1'
        this.diseaseRisk = 'Cao'
      } else if (this.student.bmi >= 35 && this.student.bmi <= 39.9) {
        this.bmiResult = 'Béo phì cấp độ 2'
        this.diseaseRisk = 'Rất cao'
      } else if (this.student.bmi >= 40) {
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

  methods: {
    ...mapActions({
      setFoods: 'food/setFoods',
    }),

    convertTimeStampsToString,
  },
}
</script>

<style>
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}

.event-title {
  padding: 0 5px;
  font-size: 12px;
}

.clickable-event {
  text-decoration: underline;
}

.card-tabs-custom {
  box-shadow: 0 0 30px 0 rgba(82 63 105 / 5%) !important;
  border: 0 !important;
}
</style>
