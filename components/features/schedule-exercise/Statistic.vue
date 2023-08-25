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
                  Lượng calo đôt cháy (kcal)
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
            class="w-100"
          />
        </div>
        <div>
          <b-modal ref="modal" size="xl" :title="modalTitle" ok-only>
            <b-tabs active-nav-item-class="font-weight-bold text-primary" card>
              <b-tab
                v-for="(se, key) in dataForChart"
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
import { WEEKDAY } from '~/constants/weekday.constant'

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
      isLoading: false,
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
      barChartOptions: {
        responsive: true,
        aspectRatio: 3,
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
      remoteUrl: '/schedule-exercise/by-week-chart',
      dataForChart: null,
      calcData: [],
      // items: [],
      fields: [
        {
          key: 'date',
          label: 'Ngày',
          class: 'text-center',
          thStyle: { width: '15%', fontWeight: 'bold' },
          tdClass: 'align-middle',
        },
        {
          key: 'activity',
          label: 'Hoạt động',
          class: 'text-center',
          thStyle: { width: '85%', fontWeight: 'bold' },
          tdClass: 'align-middle',
        },
      ],
    }
  },

  computed: {
    ADMIN() {
      return ADMIN
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

    modalTitle() {
      return `${this.student.fullName}: Chi tiết hoạt động luyện tập ${this.startWeekStr} - ${this.endWeekStr}`
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
    queryUrl() {
      this.calcData = []
      this.loadScheduleExerciseData()
    },
  },

  async mounted() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

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
      this.isLoading = true
      await this.delay(500)
      try {
        const { data } = await this.$axios.get(this.queryUrl)
        this.dataForChart = data.chartData
        // this.items = data.tableData

        for (const key in this.dataForChart) {
          let totalCal = 0
          for (let i = 0; i < this.dataForChart[key].length; i++) {
            totalCal += this.dataForChart[key][i]?.calo
          }

          this.calcData.push(totalCal)
        }
      } catch (e) {
        this.calcData = []
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
