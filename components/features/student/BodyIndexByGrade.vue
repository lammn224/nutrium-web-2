<template>
  <div class="flex-row-fluid col-lg-6 pl-lg-2 p-0">
    <div class="card card-custom card-stretch mb-5">
      <div class="card-header pt-5" style="display: block">
        <div class="row justify-content-between">
          <div class="col-lg-auto">
            <h3 class="card-label font-weight-bolder text-dark">
              Chiều cao và cân nặng trung bình theo khối lớp
            </h3>
          </div>
        </div>
      </div>

      <b-overlay
        :show="isLoading"
        rounded="sm"
        spinner-small
        spinner-type="grow"
        spinner-variant="primary"
      >
        <div class="card-body">
          <BarChart
            :chart-data="barChartData"
            :chart-options="barChartOptions"
            :height="60"
            :width="100"
          />
        </div>
      </b-overlay>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvgBodyIndexByGrade',
  data() {
    return {
      barChartOptions: {
        responsive: true,
      },
      remoteUrl: '/students/student-idx-by-grade',
      labels: [],
      dataForChart: [],
      calcData: [[], []],
      isLoading: false,
      delay: null,
    }
  },

  computed: {
    barChartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Cân nặng (kg)',
            backgroundColor: '#459b7c',
            data: this.calcData[0],
          },
          {
            label: 'Chiều cao (cm)',
            backgroundColor: '#07570e',
            data: this.calcData[1],
          },
        ],
      }
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadStudentIdxData()
  },

  methods: {
    async loadStudentIdxData() {
      this.isLoading = true
      await this.delay(500)
      try {
        const { data } = await this.$axios.get(this.remoteUrl)

        data.forEach((d) => {
          this.labels.push(d.grade)
          this.calcData[0].push(d.avgWeight)
          this.calcData[1].push(d.avgHeight)
        })
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
