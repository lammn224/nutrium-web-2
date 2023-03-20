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
                class="btn btn-outline btn-default today-button font-size-sm line-height-sm"
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
                Thông tin calo (kcal)
              </h3>
              <span class="text-muted font-weight-bold font-size-sm mt-1">
                {{ `Ngày ${startWeekStr} - ${endWeekStr}` }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div
          v-if="student"
          class="text-center card-label font-weight-bolder text-dark"
        >
          {{ student.fullName }}
        </div>
        <BarChart
          :chart-data="barChartData"
          :chart-options="barChartOptions"
          :height="$auth.user.role === ADMIN() ? 40 : 60"
          :width="100"
        />
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
import { BREAKFAST, DINNER, LAUNCH } from '~/constants/meal-type.constant'

export default {
  name: 'MealStatistic',
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
        // responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
      timestamp: Math.floor(Date.now() / 1000),
      loadingInstance: null,
      loading: true,
      remoteUrl: '/meals/by-week-per-student-chart',
      dataForChart: [],
      calcData: [[], [], []],
    }
  },

  computed: {
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
        datasets:
          this.$auth.user.role === ADMIN
            ? [
                {
                  label: 'Bữa trưa (kcal)',
                  backgroundColor: '#459b7c',
                  data: this.calcData[0],
                },
              ]
            : [
                {
                  label: 'Bữa trưa (kcal)',
                  backgroundColor: '#459b7c',
                  data: this.calcData[0],
                },
                {
                  label: 'Bữa sáng (kcal)',
                  backgroundColor: '#94c9a2',
                  data: this.calcData[1],
                },
                {
                  label: 'Bữa tối (kcal)',
                  backgroundColor: '#b8dc7c',
                  data: this.calcData[2],
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
      this.calcData = [[], [], []]
      this.loadMealsData()
    },
  },

  async mounted() {
    // this.loadingInstance = VeLoading({
    //   target: this.$refs.datatable,
    //   name: null,
    // })

    await this.loadMealsData()
  },

  methods: {
    ADMIN() {
      return ADMIN
    },
    goPrev() {
      this.timestamp -= 604800
    },

    goNext() {
      this.timestamp += 604800
    },

    goToday() {
      this.timestamp = Date.now() / 1000
    },

    async loadMealsData() {
      // this.loadingInstance.show()

      try {
        const { data } = await this.$axios.get(this.queryUrl)
        this.dataForChart = data

        for (const key in this.dataForChart) {
          if (this.dataForChart[key].length) {
            const day = this.dataForChart[key]

            if (day.length === 1) {
              if (day[0].type === LAUNCH) {
                this.calcData[1].push(0)
                this.calcData[2].push(0)

                this.calcData[0].push(day[0].power)
              }

              if (day[0].type === BREAKFAST) {
                this.calcData[0].push(0)
                this.calcData[2].push(0)

                this.calcData[1].push(day[0].power)
              }

              if (day[0].type === DINNER) {
                this.calcData[0].push(0)
                this.calcData[1].push(0)

                this.calcData[2].push(day[0].power)
              }
            }

            if (day.length === 2) {
              if (day[0].type === LAUNCH && day[1].type === BREAKFAST) {
                this.calcData[2].push(0)

                this.calcData[0].push(day[0].power)
                this.calcData[1].push(day[1].power)
              }

              if (day[0].type === BREAKFAST && day[1].type === DINNER) {
                this.calcData[0].push(0)

                this.calcData[1].push(day[0].power)
                this.calcData[2].push(day[1].power)
              }

              if (day[0].type === LAUNCH && day[1].type === DINNER) {
                this.calcData[1].push(0)

                this.calcData[0].push(day[0].power)
                this.calcData[2].push(day[0].power)
              }
            }

            if (day.length === 3) {
              this.calcData[0].push(day[0].power)
              this.calcData[1].push(day[1].power)
              this.calcData[2].push(day[2].power)
            }
          } else {
            this.calcData[0].push(0)
            this.calcData[1].push(0)
            this.calcData[2].push(0)
          }
        }
      } catch (e) {
        this.totalRecord = 0
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
