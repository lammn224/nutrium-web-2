<template>
  <div class="flex-row-fluid" :class="className">
    <div class="card card-custom card-stretch mb-5">
      <div class="card-header pt-5" style="display: block">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-auto h-100">
            <div class="btn-group font-size-sm">
              <button
                class="btn btn-outline btn-primary font-size-sm line-height-sm"
                form=""
                @click.stop="goPrev"
              >
                <i class="flaticon2-back icon-sm"></i> Tuần trước
              </button>
              <button
                class="btn btn-outline btn-primary today-button font-size-sm line-height-sm"
                form=""
                @click.stop="goToday"
              >
                <i class="flaticon2-down icon-sm"></i> Hiện tại
              </button>
              <button
                class="btn btn-outline btn-primary font-size-sm line-height-sm"
                form=""
                @click.stop="goNext"
              >
                Tuần sau <i class="flaticon2-next icon-sm"></i>
              </button>
            </div>
          </div>
          <div class="col-lg-auto">
            <div class="card-title align-items-start flex-column">
              <h3 class="card-label font-weight-bolder text-dark">
                Lượng calo đôt cháy (kcal)
              </h3>
              <span class="text-dark font-weight-bold font-size-sm mt-1">
                {{ `Ngày ${startWeekStr} - ${endWeekStr}` }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body d-flex flex-column align-items-center">
        <div class="d-flex align-items-center justify-content-between w-25">
          <div
            v-if="student"
            class="text-center card-label font-weight-bolder text-dark"
          >
            {{ student.fullName }}
          </div>
          <b-button variant="primary" size="sm" @click="showDetail"
            >Xem chi tiết</b-button
          >
        </div>
        <BarChart
          :chart-data="barChartData"
          :chart-options="barChartOptions"
          :height="$auth.user.role === ADMIN ? 40 : 60"
          :width="100"
          class="w-100"
        />
      </div>
      <div>
        <b-modal
          ref="modal"
          size="xl"
          title="Chi tiết hoạt động luyện tập"
          ok-only
        >
          <div>
            <b-table
              :items="items"
              :fields="fields"
              stacked="md"
              show-empty
              bordered
              striped
              head-variant="light"
              small
            >
              <template #cell(activity)="row">
                <div class="d-flex justify-content-start">
                  <b-card
                    v-for="(d, idx) in row.item.scheduleExercise"
                    :key="idx"
                    class="m-2"
                    bg-variant="primary"
                    text-variant="white"
                  >
                    <!--                    <i class="fa-arrow-circle-o-right"></i>-->
                    <div class="d-flex align-items-center">
                      <i class="flaticon2-arrow text-white mr-2"></i>
                      <span class="font-weight-bold">Hoạt động:&nbsp;</span>
                      <span>{{ d.activity.name }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="flaticon2-arrow text-white mr-2"></i>
                      <span class="font-weight-bold"
                        >Lượng calo đốt cháy:&nbsp;</span
                      >
                      <span>{{ d.calo }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="flaticon2-arrow text-white mr-2"></i>
                      <span class="font-weight-bold">Thời gian:&nbsp;</span>
                      <span>{{ d.timeDur }}</span>
                    </div>
                  </b-card>
                </div>
              </template>
            </b-table>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
// import { VeLoading } from 'vue-easytable'
import {
  dateToString,
  endOfWeek,
  startOfWeek,
} from '~/services/convertTimeStamps.service'
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'ScheduleExerciseStatistic',
  props: {
    student: {
      type: Object,
      default: () => {},
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      barChartOptions: {
        responsive: true,
        aspectRatio: 3,
        plugins: {
          annotation: {
            clip: false,
            // annotations: {
            //   line1: {
            //     type: 'line',
            //     label: {
            //       display: !!this.student,
            //       content: `KNNL: ${this.student?.rcmCalories} kcal`,
            //       position: 'end',
            //       backgroundColor: 'rgb(255, 99, 132)',
            //       borderWidth: 1,
            //       xAdjust: 5,
            //       yAdjust: -25,
            //       // xAdjust: 6,
            //       // z: 100,
            //       callout: {
            //         display: true,
            //         borderColor: 'rgb(255, 99, 132)',
            //         borderDash: [6, 6],
            //         borderWidth: 2,
            //         margin: -2,
            //       },
            //     },
            //     // yMin: this.student ? this.student.rcmCalories : 0,
            //     // yMax: this.student ? this.student.rcmCalories : 0,
            //     scaleID: 'y',
            //     value: this.student ? this.student.rcmCalories : 0,
            //     borderColor: 'rgb(255, 99, 132)',
            //     borderWidth: this.student ? 2 : 0,
            //     borderDash: [6, 6],
            //     borderDashOffset: 0,
            //   },
            // },
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Ngày',
            },
          },
          y: {
            stacked: true,
            // max: 3000,
            title: {
              display: true,
              text: 'kcal',
            },
          },
        },
      },
      timestamp: 1686157200,
      loadingInstance: null,
      loading: true,
      remoteUrl: '/schedule-exercise/by-week-chart',
      dataForChart: null,
      calcData: [],
      // items: [
      //   {
      //     date: 'mon',
      //     data: [
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       },
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       }
      //     ]
      //   },
      //   {
      //     date: 'tue',
      //     data: [
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       }
      //     ]
      //   },
      //   {
      //     date: 'wed',
      //     data: [
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       }
      //     ]
      //   },
      //   {
      //     date: 'thu',
      //     data: [
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       }
      //     ]
      //   },
      //   {
      //     date: 'fri',
      //     data: [
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       }
      //     ]
      //   },
      //   {
      //     date: 'sat',
      //     data: [
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       }
      //     ]
      //   },
      //   {
      //     date: 'sun',
      //     data: [
      //       {
      //         "_id": "64907b8d651c6c64edc6947d",
      //         "activity": { "_id": "649077d95d0e8975b114de90", "name": "Đạp xe - trung bình (22-25km/h)", "metIdx": 10, "school": "64146640b3fb92ea7d9058cc", "deleted": false },
      //         "timeDur": 120,
      //         "calo": 1365,
      //         "school": "64146640b3fb92ea7d9058cc",
      //         "student": "6416fd30f590aa3ef5228c55",
      //         "date": 1686070800,
      //         "deleted": false,
      //         "createdAt": 1687190413989,
      //         "updatedAt": 1687190413989
      //       }
      //     ]
      //   },
      // ],
      items: [],
      fields: [
        {
          key: 'date',
          label: 'Ngày',
          class: 'text-center',
          thStyle: { width: '15%', fontWeight: 'bold' },
        },
        {
          key: 'activity',
          label: 'Hoạt động',
          class: 'text-center',
          thStyle: { width: '85%', fontWeight: 'bold' },
        },
      ],
    }
  },

  computed: {
    ADMIN() {
      return ADMIN
    },

    startWeekStr() {
      return dateToString(startOfWeek(this.timestamp))
    },

    endWeekStr() {
      return dateToString(endOfWeek(this.timestamp))
    },

    queryUrl() {
      let url = this.remoteUrl

      const params = new URLSearchParams(
        this.$auth.user.role === ADMIN
          ? { ts: this.timestamp }
          : {
              ts: this.timestamp,
              studentId: this.student._id,
            }
      )

      const paramsStr = params.toString()
      url += '?' + paramsStr

      return url
    },

    barChartData() {
      return {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Lượng calo đốt cháy (kcal)',
            backgroundColor: '#016768',
            data: this.calcData,
          },
        ],
      }
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
      this.calcData = []
      this.loadScheduleExerciseData()
    },
  },

  async mounted() {
    // this.loadingInstance = VeLoading({
    //   target: this.$refs.datatable,
    //   name: null,
    // })

    await this.loadScheduleExerciseData()
  },

  methods: {
    goPrev() {
      this.timestamp -= 604800
    },

    goNext() {
      this.timestamp += 604800
    },

    goToday() {
      this.timestamp = Date.now() / 1000
    },

    showDetail() {
      this.$refs.modal.show()
    },

    async loadScheduleExerciseData() {
      // this.loadingInstance.show()

      try {
        const { data } = await this.$axios.get(this.queryUrl)
        this.dataForChart = data.chartData
        // this.dataForChart = data.tableData

        for (const key in this.dataForChart) {
          let totalCal = 0
          for (let i = 0; i < this.dataForChart[key].length; i++) {
            totalCal += this.dataForChart[key][i]?.calo
          }

          this.calcData.push(totalCal)
        }

        this.items = data.tableData
      } catch (e) {
        this.calcData = []
      } finally {
        // this.loadingInstance.close()
        this.firstLoading = true
      }
    },
  },
}
</script>

<style>
.chart-wrapper {
  border: 1px solid blue;
  height: 300px;
  width: 600px;
}
</style>
