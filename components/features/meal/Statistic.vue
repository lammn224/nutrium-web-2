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
                  Thông tin calo (kcal)
                </h3>
                <span class="text-dark font-weight-bold font-size-sm mt-1">
                  {{ `Ngày ${startWeekStr} - ${endWeekStr}` }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="showDetail"
            >Xem chi tiết</b-button
          >
          <BarChart
            :chart-data="barChartData"
            :chart-options="barChartOptions"
            :height="$auth.user.role === ADMIN ? 40 : 60"
            :width="100"
          />
          <div>
            <b-modal ref="mealModal" size="xl" :title="mealModalTitle" ok-only>
              <b-tabs
                active-nav-item-class="font-weight-bold text-primary"
                card
              >
                <b-tab
                  v-for="(mealsData, key) in mealSummaryData"
                  :key="key"
                  :title="WEEKDAY.get(key)"
                >
                  <b-tabs
                    active-nav-item-class="font-weight-bold text-primary"
                    card
                  >
                    <b-tab
                      v-for="(meal, index) in mealsData.meals"
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
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import {
  dateToString,
  endOfWeek,
  startOfWeek,
} from '~/services/convertTimeStamps.service'
import { ADMIN } from '~/constants/role.constant'
import {
  BREAKFAST,
  DINNER,
  LAUNCH,
  MEALS,
} from '~/constants/meal-type.constant'
import { WEEKDAY } from '~/constants/weekday.constant'

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
      isLoading: false,
      barChartOptions: {
        responsive: true,
        aspectRatio: 3,
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
      timestamp: Math.floor(Date.now() / 1000),
      remoteUrl: '/meals/by-week-chart',
      mealSummaryData: [],
      calcData: [[], [], []],
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
    }
  },

  computed: {
    ADMIN() {
      return ADMIN
    },

    MEALS() {
      return MEALS
    },

    WEEKDAY() {
      return WEEKDAY
    },

    startWeekStr() {
      return dateToString(startOfWeek(this.timestamp))
    },

    endWeekStr() {
      return dateToString(endOfWeek(this.timestamp))
    },

    mealModalTitle() {
      if (this.student) {
        return `${this.student.fullName}: Chi tiết bữa ăn ${this.startWeekStr} - ${this.endWeekStr}`
      }

      return `Chi tiết bữa ăn ${this.startWeekStr} - ${this.endWeekStr}`
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
                  backgroundColor: [
                    '#016768',
                    '#016768',
                    '#016768',
                    '#016768',
                    '#016768',
                    '#7b005c',
                    '#7b005c',
                  ],
                  data: this.calcData[0],
                },
              ]
            : [
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
                  data: this.calcData[0],
                },
                {
                  label: 'Bữa sáng (kcal)',
                  backgroundColor: [
                    '#01abae',
                    '#01abae',
                    '#01abae',
                    '#01abae',
                    '#01abae',
                    '#cd0096',
                    '#cd0096',
                  ],
                  data: this.calcData[1],
                },
                {
                  label: 'Bữa tối (kcal)',
                  backgroundColor: [
                    '#69b800',
                    '#69b800',
                    '#69b800',
                    '#69b800',
                    '#69b800',
                    '#ffc403',
                    '#ffc403',
                  ],
                  data: this.calcData[2],
                },
              ],
      }
    },
  },

  watch: {
    queryUrl() {
      this.calcData = [[], [], []]
      this.loadMealsData()
    },
  },

  async mounted() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    await this.loadMealsData()
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
      this.$refs.mealModal.show()
    },

    async loadMealsData() {
      this.isLoading = true
      await this.delay(500)
      try {
        const { data } = await this.$axios.get(this.queryUrl)
        this.mealSummaryData = data

        for (const key in this.mealSummaryData) {
          const listMealsOfDay = this.mealSummaryData[key].meals

          if (listMealsOfDay.length) {
            const isWeekend = new Date(
              listMealsOfDay[0].date * 1000
            ).toLocaleString('en-US', { weekday: 'short' })

            if (isWeekend === 'Sun' || isWeekend === 'Sat') {
              if (listMealsOfDay.length === 1) {
                if (listMealsOfDay[0].type === LAUNCH) {
                  this.calcData[1].push(0)
                  this.calcData[2].push(0)

                  this.calcData[0].push(listMealsOfDay[0].power)
                }

                if (listMealsOfDay[0].type === BREAKFAST) {
                  this.calcData[0].push(0)
                  this.calcData[2].push(0)

                  this.calcData[1].push(listMealsOfDay[0].power)
                }

                if (listMealsOfDay[0].type === DINNER) {
                  this.calcData[0].push(0)
                  this.calcData[1].push(0)

                  this.calcData[2].push(listMealsOfDay[0].power)
                }
              }

              if (listMealsOfDay.length === 2) {
                if (
                  listMealsOfDay[0].type === BREAKFAST &&
                  listMealsOfDay[1].type === LAUNCH
                ) {
                  this.calcData[2].push(0)

                  this.calcData[0].push(listMealsOfDay[1].power)
                  this.calcData[1].push(listMealsOfDay[0].power)
                }

                if (
                  listMealsOfDay[0].type === BREAKFAST &&
                  listMealsOfDay[1].type === DINNER
                ) {
                  this.calcData[0].push(0)

                  this.calcData[1].push(listMealsOfDay[0].power)
                  this.calcData[2].push(listMealsOfDay[1].power)
                }

                if (
                  listMealsOfDay[0].type === DINNER &&
                  listMealsOfDay[1].type === LAUNCH
                ) {
                  this.calcData[1].push(0)

                  this.calcData[0].push(listMealsOfDay[1].power)
                  this.calcData[2].push(listMealsOfDay[0].power)
                }
              }

              if (listMealsOfDay.length === 3) {
                this.calcData[0].push(listMealsOfDay[0].power)
                this.calcData[1].push(listMealsOfDay[1].power)
                this.calcData[2].push(listMealsOfDay[2].power)
              }
            } else {
              if (listMealsOfDay.length === 1) {
                if (listMealsOfDay[0].type === LAUNCH) {
                  this.calcData[1].push(0)
                  this.calcData[2].push(0)

                  this.calcData[0].push(listMealsOfDay[0].power)
                }

                if (listMealsOfDay[0].type === BREAKFAST) {
                  this.calcData[0].push(0)
                  this.calcData[2].push(0)

                  this.calcData[1].push(listMealsOfDay[0].power)
                }

                if (listMealsOfDay[0].type === DINNER) {
                  this.calcData[0].push(0)
                  this.calcData[1].push(0)

                  this.calcData[2].push(listMealsOfDay[0].power)
                }
              }

              if (listMealsOfDay.length === 2) {
                if (
                  listMealsOfDay[0].type === LAUNCH &&
                  listMealsOfDay[1].type === BREAKFAST
                ) {
                  this.calcData[2].push(0)

                  this.calcData[0].push(listMealsOfDay[0].power)
                  this.calcData[1].push(listMealsOfDay[1].power)
                }

                if (
                  listMealsOfDay[0].type === BREAKFAST &&
                  listMealsOfDay[1].type === DINNER
                ) {
                  this.calcData[0].push(0)

                  this.calcData[1].push(listMealsOfDay[0].power)
                  this.calcData[2].push(listMealsOfDay[1].power)
                }

                if (
                  listMealsOfDay[0].type === LAUNCH &&
                  listMealsOfDay[1].type === DINNER
                ) {
                  this.calcData[1].push(0)

                  this.calcData[0].push(listMealsOfDay[0].power)
                  this.calcData[2].push(listMealsOfDay[0].power)
                }
              }

              if (listMealsOfDay.length === 3) {
                this.calcData[0].push(listMealsOfDay[0].power)
                this.calcData[1].push(listMealsOfDay[1].power)
                this.calcData[2].push(listMealsOfDay[2].power)
              }
            }
          } else {
            this.calcData[0].push(0)
            this.calcData[1].push(0)
            this.calcData[2].push(0)
          }
        }
      } catch (e) {
        this.calcMealData = [[], [], []]
      } finally {
        this.isLoading = false
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
