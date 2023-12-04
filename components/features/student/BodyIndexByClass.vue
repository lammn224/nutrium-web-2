<template>
  <div class="flex-row-fluid col-lg-6 pr-lg-2 p-0">
    <div class="card card-custom card-stretch mb-5">
      <div class="card-header pt-5" style="display: block">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-auto">
            <h3 class="card-label font-weight-bolder text-dark m-0">
              Chiều cao - cân nặng TB theo lớp
            </h3>
          </div>
          <label class="col-lg-auto col-form-label"> Khối lớp </label>
          <b-form-group class="col-lg-3 pl-0 m-0" label="" v-bind="$attrs">
            <b-form-select
              v-model="grade"
              :options="gradeOption"
              class=""
              size="sm"
            ></b-form-select>
          </b-form-group>
        </div>
        <!--        <div class="row">-->
        <!--          <label class="col-lg-auto col-form-label"> Khối lớp </label>-->
        <!--          <b-form-group class="col-lg-3 pl-0" label="" v-bind="$attrs">-->
        <!--            <b-form-select-->
        <!--              v-model="grade"-->
        <!--              :options="gradeOption"-->
        <!--              class=""-->
        <!--              size="sm"-->
        <!--            ></b-form-select>-->
        <!--          </b-form-group>-->
        <!--        </div>-->
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
  name: 'AvgBodyIndexByClass',
  data() {
    return {
      barChartOptions: {
        responsive: true,
      },
      remoteUrl: '/students/student-idx-by-class',
      labels: [],
      dataForChart: [],
      calcData: [[], []],
      grade: '',
      gradeOption: [],
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

    queryUrl() {
      let url = this.remoteUrl

      const params = new URLSearchParams({
        grade: this.grade,
      })

      const paramsStr = params.toString()
      url += '?' + paramsStr

      return url
    },
  },

  watch: {
    async queryUrl() {
      this.calcData = [[], []]
      this.labels = []
      await this.loadStudentIdxData()
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadGradeOption()
    this.loadStudentIdxData()
  },

  methods: {
    async loadStudentIdxData() {
      this.isLoading = true
      await this.delay(500)
      try {
        const { data } = await this.$axios.get(this.queryUrl)
        const filteredData = [[], []]
        const labels = []
        data.forEach((d) => {
          labels.push(d.class)
          filteredData[0].push(d.avgWeight)
          filteredData[1].push(d.avgHeight)
        })
        this.calcData = filteredData
        this.labels = labels
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    async loadGradeOption() {
      const { data } = await this.$axios.get('/grade')

      const grades = data.results

      grades.forEach((grade) => {
        this.gradeOption.push({ value: grade._id, text: grade.name })
      })

      this.grade = this.gradeOption[0]?.value
    },
  },
}
</script>
