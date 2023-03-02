<template>
  <div>
    <div class="d-flex">
      <div class="flex-row-auto offcanvas-mobile w-300px w-xl-350px h-100">
        <div class="card card-custom card-stretch">
          <b-m-i-calculator></b-m-i-calculator>
        </div>
      </div>

      <div class="flex-row-fluid ml-lg-8">
        <div class="card card-custom mb-5">
          <div class="card-header py-5" style="display: block">
            <div class="row">
              <div class="col-sm-6">
                <div class="btn-group">
                  <button
                    class="btn btn-outline btn-primary"
                    form=""
                    @click.stop="goPrev"
                  >
                    <i class="flaticon2-back"></i> Previous
                  </button>
                  <button
                    class="btn btn-outline btn-default today-button"
                    form=""
                    @click.stop="goToday"
                  >
                    <i class="flaticon2-down"></i> Today
                  </button>
                  <button
                    class="btn btn-outline btn-primary"
                    form=""
                    @click.stop="goNext"
                  >
                    Next <i class="flaticon2-next"></i>
                  </button>
                </div>
              </div>
              <div class="col-sm-6">
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
            <BarChart
              :chart-data="barChartData"
              :chart-options="barChartOptions"
              :height="60"
              :width="100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VeLoading } from 'vue-easytable'
import { mapActions } from 'vuex'
import {
  convertTimeStampsToString,
  dateToString,
  endOfWeek,
  startOfWeek,
} from '~/services/convertTimeStamps.service'
import { ADMIN } from '~/constants/role.constant'
import { BREAKFAST, DINNER, LAUNCH } from '~/constants/meal-type.constant'

export default {
  name: 'IndexPage',
  data() {
    return {
      barChartOptions: {
        responsive: true,
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
      remoteUrl: '/meals/by-week',
      dataForChart: [],
      calcData: [[], [], []],
    }
  },

  head() {
    return {
      title: 'Home',
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

      const params = new URLSearchParams({
        ts: this.timestamp,
      })

      const paramsStr = params.toString()
      url += '?' + paramsStr

      return url
    },

    barChartData() {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets:
          this.$auth.user.role === ADMIN
            ? [
                {
                  label: 'Bữa trưa',
                  backgroundColor: '#00b395',
                  data: this.calcData[0],
                },
              ]
            : [
                {
                  label: 'Bữa trưa',
                  backgroundColor: '#f87979',
                  data: this.calcData[0],
                },
                {
                  label: 'Bữa sáng',
                  backgroundColor: '#3D5B96',
                  data: this.calcData[1],
                },
                {
                  label: 'Bữa tối',
                  backgroundColor: '#1EFFFF',
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
    this.loadingInstance = VeLoading({
      target: this.$refs.datatable,
      name: null,
    })

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

    async loadMealsData() {
      this.loadingInstance.show()

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
