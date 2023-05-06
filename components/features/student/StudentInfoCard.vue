<template>
  <div
    id="kt_profile_aside"
    class="flex-row-auto offcanvas-mobile w-300px w-xl-350px h-auto"
  >
    <div class="card card-custom card-stretch">
      <div class="card-body pt-4">
        <!--begin::Contact-->
        <div class="d-flex align-items-center">
          <div
            class="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center"
          >
            <div class="symbol-label">
              <img
                class="symbol-label"
                src="~/assets/media/users/blank.png"
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

        <div class="py-9">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="font-weight-bold mr-2">Họ và tên:</span>
            <a class="text-dark text-hover-primary">{{ student.fullName }}</a>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="font-weight-bold mr-2">Mã học sinh:</span>
            <span class="text-dark">{{ student.studentId }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="font-weight-bold mr-2">Chiều cao:</span>
            <span class="text-dark">{{ student.height }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="font-weight-bold mr-2">Cân nặng:</span>
            <span class="text-dark">{{ student.weight }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="font-weight-bold mr-2">Chỉ số BMI:</span>
            <span class="text-dark">{{ student.bmi }} - {{ bmiResult }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="font-weight-bold mr-2">Nguy cơ phát triển bệnh:</span>
            <span class="text-dark">{{ diseaseRisk }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <span class="font-weight-bold mr-2">KNNL (kcal):</span>
            <span class="text-dark">{{ student.rcmCalories }}</span>
          </div>
        </div>
        <!--end::Contact-->
      </div>
    </div>
  </div>
</template>

<script>
import { ROLES } from '~/constants/role.constant'
import { convertTimeStampsToString } from '~/services/convertTimeStamps.service'

export default {
  name: 'StudentInfoCard',
  props: {
    student: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      bmiResult: '',
      diseaseRisk: '',
    }
  },
  computed: {
    ROLES() {
      return ROLES
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
  methods: { convertTimeStampsToString },
}
</script>
