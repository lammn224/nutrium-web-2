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
                        disabled
                        :value="student.fullName"
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
                      <input
                        ref="fullName"
                        disabled
                        :value="convertTimeStampsToString(student.dateOfBirth)"
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        placeholder="Ngày sinh"
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
                        disabled
                        :value="student.height"
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
                        disabled
                        :value="student.weight"
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        placeholder="Cân nặng"
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
                        disabled
                        :value="student.bmi"
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        placeholder="Cân nặng"
                      />
                    </div>
                    <div class="col-lg-4 col-xl-4">
                      <input
                        ref="bmiResult"
                        disabled
                        :value="bmiResult"
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        placeholder="Không xác định"
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
                        disabled
                        :value="diseaseRisk"
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        placeholder="Không xác định"
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
                          disabled
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
                          v-model="selectedActivityType"
                          disabled
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
                        disabled
                        :value="student.rcmCalories"
                        class="form-control form-control-lg form-control-solid"
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
            <div class="card card-custom mb-5">
              <!--begin::Header-->
              <div class="card-header py-5" style="display: block">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="btn-group">
                      <button
                        class="btn btn-outline btn-primary"
                        form=""
                        @click.stop="goPrev"
                      >
                        <i class="flaticon2-back"></i> Tuần trước
                      </button>
                      <button
                        class="btn btn-outline btn-primary today-button"
                        form=""
                        @click.stop="goToday"
                      >
                        <i class="flaticon2-down"></i> Hiện tại
                      </button>
                      <button
                        class="btn btn-outline btn-primary"
                        form=""
                        @click.stop="goNext"
                      >
                        Tuần sau <i class="flaticon2-next"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card-title align-items-start flex-column">
                      <h3 class="card-label font-weight-bolder text-dark">
                        Thông tin bữa ăn
                      </h3>
                      <span
                        class="text-muted font-weight-bold font-size-sm mt-1"
                      >
                        {{ `Ngày ${startWeekStr} - ${endWeekStr}` }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Header-->
              <div ref="datatable" class="mt-5">
                <ve-table
                  :style="{ 'word-break': 'break-all' }"
                  :columns="tableColumns"
                  :table-data="tableData"
                  :row-style-option="rowStyleOption"
                  :max-height="650"
                  border-y
                />
              </div>
              <meal-modal2 v-if="foods" ref="modal" />
              <div
                class="text-hover-primary p-5"
                style="cursor: pointer"
                @click="$router.push('/calendar')"
              >
                <i class="flaticon2-arrow"></i>
                Đi tới lập lịch bữa ăn
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import { VeLoading, VeTable } from 'vue-easytable'
import { mapActions } from 'vuex'
import { ROLES } from '~/constants/role.constant'
import {
  convertTimeStampsToString,
  dateToString,
  endOfWeek,
  startOfWeek,
} from '~/services/convertTimeStamps.service'
import { MEALS, LAUNCH, DINNER } from '~/constants/meal-type.constant'

export default {
  name: 'StudentDetail',
  components: {
    VeTable,
  },
  props: {
    student: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      default_photo: 'media/students/blank.png',
      current_photo: null,
      meals: [],
      remoteUrl: '/meals/by-week-per-student',
      loadingInstance: null,
      loading: true,
      firstLoading: false,
      rowStyleOption: {
        stripe: true,
        hoverHighlight: false,
      },
      tableData: [],
      timestamp: Math.floor(Date.now() / 1000),
      foods: [],
      selectedGender: this.student.gender,
      genderOptions: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
      selectedActivityType: this.student.activityType,
      activityTypeOptions: [
        { text: 'Không', value: 'none' },
        { text: 'Nhẹ', value: 'light' },
        { text: 'Trung bình', value: 'moderate' },
        { text: 'Nặng', value: 'heavy' },
      ],
      bmiResult: '',
      diseaseRisk: '',
    }
  },

  computed: {
    ROLES() {
      return ROLES
    },
    tableColumns() {
      return [
        {
          field: 'mon',
          key: 'mon',
          title: 'T2',
          width: 100,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.mon.length) {
              return (
                <div class="mt-2">
                  {row.mon.map((meal, id) => {
                    return meal.type === LAUNCH ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-secondary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : meal.type === DINNER ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-warning panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-primary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    )
                  })}
                </div>
              )
            } else return <div>Không có dữ liệu!</div>
          },
        },
        {
          field: 'tue',
          key: 'tue',
          title: 'T3',
          width: 100,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.tue.length) {
              return (
                <div class="mt-2">
                  {row.tue.map((meal, id) => {
                    return meal.type === LAUNCH ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-secondary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : meal.type === DINNER ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-warning panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-primary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    )
                  })}
                </div>
              )
            } else return <div>Không có dữ liệu!</div>
          },
        },
        {
          field: 'wed',
          key: 'wed',
          title: 'T4',
          width: 100,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.wed.length) {
              return (
                <div class="mt-2">
                  {row.wed.map((meal, id) => {
                    return meal.type === LAUNCH ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-secondary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : meal.type === DINNER ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-warning panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-primary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    )
                  })}
                </div>
              )
            } else return <div>Không có dữ liệu!</div>
          },
        },
        {
          field: 'thu',
          key: 'thu',
          title: 'T5',
          width: 100,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.thu.length) {
              return (
                <div class="mt-2">
                  {row.thu.map((meal, id) => {
                    return meal.type === LAUNCH ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-secondary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : meal.type === DINNER ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-warning panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-primary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    )
                  })}
                </div>
              )
            } else return <div>Không có dữ liệu!</div>
          },
        },
        {
          field: 'fri',
          key: 'fri',
          title: 'T6',
          width: 100,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.fri.length) {
              return (
                <div class="mt-2">
                  {row.fri.map((meal, id) => {
                    return meal.type === LAUNCH ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-secondary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : meal.type === DINNER ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-warning panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-primary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    )
                  })}
                </div>
              )
            } else return <div>Không có dữ liệu!</div>
          },
        },
        {
          field: 'sat',
          key: 'sat',
          title: 'T7',
          width: 100,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.sat.length) {
              return (
                <div class="mt-2">
                  {row.sat.map((meal, id) => {
                    return meal.type === LAUNCH ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-secondary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : meal.type === DINNER ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-warning panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-primary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    )
                  })}
                </div>
              )
            } else return <div>Không có dữ liệu!</div>
          },
        },
        {
          field: 'sun',
          key: 'sun',
          title: 'CN',
          width: 100,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            if (row.sun.length) {
              return (
                <div class="mt-2">
                  {row.sun.map((meal, id) => {
                    return meal.type === LAUNCH ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-secondary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : meal.type === DINNER ? (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-warning panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    ) : (
                      <div
                        style="cursor: pointer;"
                        class="panel no-margin bg-primary panel-heading event-title"
                        key={id}
                        on-click={() => {
                          this.$refs.modal.show(meal)
                        }}
                      >
                        {MEALS.get(meal.type)}
                      </div>
                    )
                  })}
                </div>
              )
            } else return <div>Không có dữ liệu!</div>
          },
        },
      ]
    },

    startWeekStr() {
      return dateToString(startOfWeek(this.timestamp))
    },

    endWeekStr() {
      return dateToString(endOfWeek(this.timestamp))
    },

    queryUrl() {
      let url = this.remoteUrl

      const params = new URLSearchParams({
        ts: this.timestamp,
        studentId: this.student._id,
      })

      const paramsStr = params.toString()
      url += '?' + paramsStr

      return url
    },
  },

  watch: {
    loading(val) {
      if (val) {
        this.loadingInstance.show()
      } else {
        this.loadingInstance.close()
      }
    },

    queryUrl() {
      this.loadMealsData()
    },
  },

  async mounted() {
    await this.loadFoodData()

    this.current_photo = this.student.photo
    this.loadingInstance = VeLoading({
      target: this.$refs.datatable,
      name: null,
    })

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

    await this.loadMealsData()
  },

  methods: {
    ...mapActions({
      setFoods: 'food/setFoods',
    }),

    convertTimeStampsToString,

    goPrev() {
      this.timestamp -= 604800
    },

    goNext() {
      this.timestamp += 604800
    },

    goToday() {
      this.timestamp = Date.now() / 1000
    },

    async loadFoodData() {
      try {
        const { data } = await this.$axios.get('/foods/all')
        this.foods = data
        await this.setFoods(this.foods)
      } catch (e) {}
    },

    async loadMealsData() {
      this.loadingInstance.show()

      try {
        const { data } = await this.$axios.get(this.queryUrl)
        this.tableData = data
      } catch (e) {
        this.tableData = []
        this.totalRecord = 0
      } finally {
        this.loadingInstance.close()
        this.firstLoading = true
      }
    },
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
