<template>
  <div class="flex-row-fluid" :class="className">
    <b-overlay
      :show="isLoading"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
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
                  {{ `Ngày ${startWeekStr} - ${endWeekStr}` }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="showDetailMeal"
            >Xem chi tiết</b-button
          >
          <BarChart
            :chart-data="barChartMealData"
            :chart-options="barChartMealOptions"
            class="w-100 mb-10"
          />
          <div>
            <b-modal ref="mealModal" size="xl" :title="mealModalTitle" ok-only>
              <b-tabs
                active-nav-item-class="font-weight-bold text-primary"
                card
              >
                <b-tab
                  v-for="(mealsData, key) in mealDataForChart"
                  :key="key"
                  :title="WEEKDAY.get(key)"
                >
                  <b-tabs
                    active-nav-item-class="font-weight-bold text-primary"
                    card
                  >
                    <b-tab
                      v-for="(meal, index) in mealsData"
                      :key="index"
                      :title="MEALS.get(meal.type)"
                    >
                      <b-table
                        hover
                        bordered
                        show-empty
                        head-variant="light"
                        :fields="foodField"
                        :items="meal.foods"
                        thead-class="font-weight-bold text-center align-middle"
                      >
                        <template #empty>
                          <h4 class="text-center">Không có dữ liệu</h4>
                        </template>
                        <template #cell(idx)="row">
                          {{ ++row.index }}
                        </template>
                        <template #cell(amount)="row">
                          {{ meal.values[row.index] }}
                        </template>
                        <template #cell(power)="row">
                          {{
                            (
                              (row.item.power * meal.values[row.index]) /
                              100
                            ).toFixed(2)
                          }}
                        </template>
                        <template #cell(protein)="row">
                          {{
                            (
                              (row.item.protein * meal.values[row.index]) /
                              100
                            ).toFixed(2)
                          }}
                        </template>
                        <template #cell(lipid)="row">
                          {{
                            (
                              (row.item.lipid * meal.values[row.index]) /
                              100
                            ).toFixed(2)
                          }}
                        </template>
                        <template #cell(glucid)="row">
                          {{
                            (
                              (row.item.glucid * meal.values[row.index]) /
                              100
                            ).toFixed(2)
                          }}
                        </template>
                        <template #cell(fe)="row">
                          {{
                            (
                              (row.item.fe * meal.values[row.index]) /
                              100
                            ).toFixed(2)
                          }}
                        </template>
                        <template #cell(zn)="row">
                          {{
                            (
                              (row.item.zn * meal.values[row.index]) /
                              100
                            ).toFixed(2)
                          }}
                        </template>
                        <template #cell(fiber)="row">
                          {{
                            (
                              (row.item.fiber * meal.values[row.index]) /
                              100
                            ).toFixed(2)
                          }}
                        </template>
                      </b-table>
                    </b-tab>
                  </b-tabs>
                </b-tab>
              </b-tabs>
            </b-modal>
          </div>
          <hr class="w-100 d-block" />

          <div class="w-100">
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="showDetailScheduledExercise"
              >Xem chi tiết</b-button
            >
          </div>
          <BarChart
            :chart-data="barChartScheduledExerciseData"
            :chart-options="barChartScheduleExerciseOptions"
            class="w-100"
          />
          <div>
            <b-modal
              ref="scheduledExerciseModal"
              size="xl"
              :title="scheduledExerciseModalTitle"
              ok-only
            >
              <b-tabs
                active-nav-item-class="font-weight-bold text-primary"
                card
              >
                <b-tab
                  v-for="(se, key) in scheduledExerciseDataForChart"
                  :key="key"
                  :title="WEEKDAY.get(key)"
                >
                  <b-table
                    hover
                    bordered
                    show-empty
                    head-variant="light"
                    :fields="exerciseField"
                    :items="se"
                    thead-class="font-weight-bold text-center align-middle"
                  >
                    <template #empty>
                      <h4 class="text-center">Không có dữ liệu</h4>
                    </template>
                    <template #cell(idx)="row">
                      {{ ++row.index }}
                    </template>
                  </b-table>
                </b-tab>
              </b-tabs>
            </b-modal>
          </div>
          <hr class="w-100 d-block" />
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'
import {
  dateToString,
  endOfWeek,
  startOfWeek,
} from '~/services/convertTimeStamps.service'
import {
  BREAKFAST,
  DINNER,
  LAUNCH,
  MEALS,
} from '~/constants/meal-type.constant'
import { WEEKDAY } from '~/constants/weekday.constant'

export default {
  name: 'StudentStatistic',
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
      isLoading: false,
      barChartScheduleExerciseOptions: {
        responsive: true,
        aspectRatio: 2.5,
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
      barChartMealOptions: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          annotation: {
            clip: false,
            annotations: {
              line1: {
                type: 'line',
                label: {
                  display: !!this.student,
                  content: `KNNL: ${this.student?.rcmCalories} kcal`,
                  position: 'end',
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderWidth: 1,
                  xAdjust: 5,
                  yAdjust: -25,
                  // xAdjust: 6,
                  // z: 100,
                  callout: {
                    display: true,
                    borderColor: 'rgb(255, 99, 132)',
                    borderDash: [6, 6],
                    borderWidth: 2,
                    margin: -2,
                  },
                },
                // yMin: this.student ? this.student.rcmCalories : 0,
                // yMax: this.student ? this.student.rcmCalories : 0,
                scaleID: 'y',
                value: this.student ? this.student.rcmCalories : 0,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: this.student ? 2 : 0,
                borderDash: [6, 6],
                borderDashOffset: 0,
              },
            },
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
      calcScheduleExerciseData: [],
      scheduledExerciseDataForChart: null,
      exerciseField: [
        {
          key: 'idx',
          label: 'STT',
          thStyle: { width: '3%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'activity.name',
          label: 'Tên hoạt động',
          thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'activity.metIdx',
          label: 'Chỉ số MET',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'timeDur',
          label: 'Thời gian (phút)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'calo',
          label: 'Calo đốt cháy (cal)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
      ],
      // scheduledExerciseItems: [],
      // scheduledExerciseFields: [
      //   {
      //     key: 'date',
      //     label: 'Ngày',
      //     class: 'text-center',
      //     thStyle: { width: '15%', fontWeight: 'bold' },
      //     tdClass: 'align-middle',
      //   },
      //   {
      //     key: 'activity',
      //     label: 'Hoạt động',
      //     class: 'text-center',
      //     thStyle: { width: '85%', fontWeight: 'bold' },
      //     tdClass: 'align-middle',
      //   },
      // ],
      calcMealData: [[], [], []],
      mealDataForChart: null,
      foodField: [
        {
          key: 'idx',
          label: 'STT',
          thStyle: { width: '3%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'name',
          label: 'Tên món ăn',
          thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'power',
          label: 'Năng lượng (kcal)',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'protein',
          label: 'Protein (g)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'lipid',
          label: 'Lipid (g)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'glucid',
          label: 'Glucid (g)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'ca',
          label: 'Canxi (mg)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'fe',
          label: 'Sắt (mg)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'zn',
          label: 'Kẽm (mg)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'fiber',
          label: 'Chất xơ (g)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
        {
          key: 'amount',
          label: 'Khối lượng (gam)',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
          thClass: { 'align-middle': true },
        },
      ],
      timestamp: Math.floor(Date.now() / 1000),
    }
  },

  computed: {
    MEALS() {
      return MEALS
    },
    WEEKDAY() {
      return WEEKDAY
    },
    ADMIN() {
      return ADMIN
    },

    startWeekStr() {
      return dateToString(startOfWeek(this.timestamp))
    },

    endWeekStr() {
      return dateToString(endOfWeek(this.timestamp))
    },

    mealModalTitle() {
      return `${this.student.fullName}: Chi tiết bữa ăn ${this.startWeekStr} - ${this.endWeekStr}`
    },

    scheduledExerciseModalTitle() {
      return `${this.student.fullName}: Chi tiết hoạt động luyện tập ${this.startWeekStr} - ${this.endWeekStr}`
    },

    barChartScheduledExerciseData() {
      return {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Lượng calo đốt cháy (kcal)',
            backgroundColor: '#016768',
            data: this.calcScheduleExerciseData,
          },
        ],
      }
    },

    barChartMealData() {
      return {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Bữa trưa (kcal)',
            backgroundColor: [
              '#016768',
              '#016768',
              '#016768',
              '#016768',
              '#016768',
              '#7b005c',
              '#7b005c',
            ],
            data: this.calcMealData[0],
          },
          {
            label: 'Bữa sáng (kcal)',
            backgroundColor: [
              '#01abae',
              '#01abae',
              '#01abae',
              '#01abae',
              '#01abae',
              '#01abae',
              '#01abae',
            ],
            data: this.calcMealData[1],
          },
          {
            label: 'Bữa tối (kcal)',
            backgroundColor: [
              '#69b800',
              '#69b800',
              '#69b800',
              '#69b800',
              '#69b800',
              '#69b800',
              '#69b800',
            ],
            data: this.calcMealData[2],
          },
        ],
      }
    },

    mealQueryUrl() {
      let url = '/meals/by-week-chart'

      const params = new URLSearchParams({
        ts: this.timestamp,
        studentId: this.student._id,
      })

      const paramsStr = params.toString()
      url += '?' + paramsStr

      return url
    },

    scheduledExerciseQueryUrl() {
      let url = '/schedule-exercise/by-week-chart'

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
    mealQueryUrl() {
      this.calcMealData = [[], [], []]
      this.loadMealsData()
    },

    scheduledExerciseQueryUrl() {
      this.calcScheduleExerciseData = []
      this.loadScheduleExerciseData()
    },
  },

  async mounted() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    await this.loadMealsData()
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

    showDetailScheduledExercise() {
      this.$refs.scheduledExerciseModal.show()
    },

    showDetailMeal() {
      this.$refs.mealModal.show()
    },

    async loadMealsData() {
      this.isLoading = true
      await this.delay(500)
      try {
        const { data } = await this.$axios.get(this.mealQueryUrl)
        this.mealDataForChart = data

        for (const key in this.mealDataForChart) {
          if (this.mealDataForChart[key].length) {
            const day = this.mealDataForChart[key]

            const isWeekend = new Date(day[0].date * 1000).toLocaleString(
              'en-US',
              { weekday: 'short' }
            )

            if (isWeekend === 'Sun' || isWeekend === 'Sat') {
              if (day.length === 1) {
                if (day[0].type === LAUNCH) {
                  this.calcMealData[1].push(0)
                  this.calcMealData[2].push(0)

                  this.calcMealData[0].push(day[0].power)
                }

                if (day[0].type === BREAKFAST) {
                  this.calcMealData[0].push(0)
                  this.calcMealData[2].push(0)

                  this.calcMealData[1].push(day[0].power)
                }

                if (day[0].type === DINNER) {
                  this.calcMealData[0].push(0)
                  this.calcMealData[1].push(0)

                  this.calcMealData[2].push(day[0].power)
                }
              }

              if (day.length === 2) {
                if (day[0].type === BREAKFAST && day[1].type === LAUNCH) {
                  this.calcMealData[2].push(0)

                  this.calcMealData[0].push(day[1].power)
                  this.calcMealData[1].push(day[0].power)
                }

                if (day[0].type === BREAKFAST && day[1].type === DINNER) {
                  this.calcMealData[0].push(0)

                  this.calcMealData[1].push(day[0].power)
                  this.calcMealData[2].push(day[1].power)
                }

                if (day[0].type === DINNER && day[1].type === LAUNCH) {
                  this.calcMealData[1].push(0)

                  this.calcMealData[0].push(day[1].power)
                  this.calcMealData[2].push(day[0].power)
                }
              }

              if (day.length === 3) {
                this.calcMealData[0].push(day[0].power)
                this.calcMealData[1].push(day[1].power)
                this.calcMealData[2].push(day[2].power)
              }
            } else {
              if (day.length === 1) {
                if (day[0].type === LAUNCH) {
                  this.calcMealData[1].push(0)
                  this.calcMealData[2].push(0)

                  this.calcMealData[0].push(day[0].power)
                }

                if (day[0].type === BREAKFAST) {
                  this.calcMealData[0].push(0)
                  this.calcMealData[2].push(0)

                  this.calcMealData[1].push(day[0].power)
                }

                if (day[0].type === DINNER) {
                  this.calcMealData[0].push(0)
                  this.calcMealData[1].push(0)

                  this.calcMealData[2].push(day[0].power)
                }
              }

              if (day.length === 2) {
                if (day[0].type === LAUNCH && day[1].type === BREAKFAST) {
                  this.calcMealData[2].push(0)

                  this.calcMealData[0].push(day[0].power)
                  this.calcMealData[1].push(day[1].power)
                }

                if (day[0].type === BREAKFAST && day[1].type === DINNER) {
                  this.calcMealData[0].push(0)

                  this.calcMealData[1].push(day[0].power)
                  this.calcMealData[2].push(day[1].power)
                }

                if (day[0].type === LAUNCH && day[1].type === DINNER) {
                  this.calcMealData[1].push(0)

                  this.calcMealData[0].push(day[0].power)
                  this.calcMealData[2].push(day[0].power)
                }
              }

              if (day.length === 3) {
                this.calcMealData[0].push(day[0].power)
                this.calcMealData[1].push(day[1].power)
                this.calcMealData[2].push(day[2].power)
              }
            }
          } else {
            this.calcMealData[0].push(0)
            this.calcMealData[1].push(0)
            this.calcMealData[2].push(0)
          }
        }
      } catch (e) {
        this.calcMealData = [[], [], []]
      } finally {
        this.isLoading = false
      }
    },

    async loadScheduleExerciseData() {
      this.isLoading = true
      await this.delay(500)
      try {
        const { data } = await this.$axios.get(this.scheduledExerciseQueryUrl)
        this.scheduledExerciseDataForChart = data.chartData
        // this.scheduledExerciseItems = data.tableData

        for (const key in this.scheduledExerciseDataForChart) {
          let totalCal = 0
          for (
            let i = 0;
            i < this.scheduledExerciseDataForChart[key].length;
            i++
          ) {
            totalCal += this.scheduledExerciseDataForChart[key][i]?.calo
          }

          this.calcScheduleExerciseData.push(totalCal)
        }
      } catch (e) {
        this.calcScheduleExerciseData = []
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
