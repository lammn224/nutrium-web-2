<template>
  <div>
    <content-card title="Danh sách tài khoản học sinh">
      <template #body>
        <div class="d-flex justify-content-between">
          <div class="d-flex mb-5">
            <div>
              <div>
                <label class="font-weight-bold font-size-lg">Trường học</label>
              </div>
              <el-select
                v-model="selectedSchool"
                value-key="_id"
                class="pr-5"
                clearable
                filterable
                :placeholder="'Chọn trường học'"
              >
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="mt-8">
            <b-input-group class="float-right pb-2" style="width: 300px">
              <template #prepend>
                <b-input-group-text>
                  <i class="flaticon-search"></i>
                </b-input-group-text>
              </template>
              <b-form-input
                v-model="keyword"
                :placeholder="'Tìm kiếm'"
                debounce="500"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>

        <b-overlay
          :show="isLoading"
          spinner-variant="primary"
          spinner-type="grow"
          spinner-small
          rounded="sm"
        >
          <b-table
            ref="table"
            hover
            bordered
            show-empty
            head-variant="light"
            :items="studentAccounts"
            :fields="fields"
            :current-page="curPage"
            :per-page="0"
            :busy="isLoading"
            thead-class="font-weight-bold font-size-lg text-center"
          >
            <template #empty>
              <h4 class="text-center">Không có dữ liệu</h4>
            </template>
            <template #cell(action)="row">
              <b-button
                size="sm"
                variant="info"
                class="mr-1"
                @click="resetPassword(row)"
                >Đổi mật khẩu</b-button
              >
            </template>
          </b-table>
          <b-pagination
            v-model="curPage"
            :total-rows="totalRows"
            :per-page="limit"
            class="justify-content-end"
            pills
          ></b-pagination>
        </b-overlay>

        <student-reset-password-modal
          ref="resetPasswordModal"
          :on-action-success="reloadData"
        />
      </template>
    </content-card>
  </div>
</template>

<script>
import { STATUS } from '~/constants/status.constant'
import NotifyMixin from '~/components/base/form/NotifyMixin'

export default {
  name: 'StudentAccountPage',
  mixins: [NotifyMixin],
  data() {
    return {
      studentAccounts: [],
      selectedSchool: null,
      schoolOptions: [],
      curPage: 1,
      keyword: '',
      totalRows: 0,
      limit: 10,
      params: '',
      isLoading: false,
      delay: null,
      sortBy: 'name',
      sortType: 'asc',
    }
  },

  head() {
    return {
      title: 'School',
    }
  },

  computed: {
    STATUS() {
      return STATUS
    },
    fields() {
      return [
        {
          key: 'studentId',
          label: 'Mã học sinh',
          sortable: true,
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'fullName',
          label: 'Họ và tên',
          thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'school.name',
          label: 'Tên trường học',
          thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'class.name',
          label: 'Tên lớp học',
          thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'action',
          label: 'Hành động',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
      ]
    },
  },

  watch: {
    curPage: {
      async handler(value) {
        this.params = `offset=${(value - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${
          this.sortType
        }&schoolId=${this.selectedSchool._id}`
        await this.loadStudentAccount()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${
          this.sortType
        }&schoolId=${this.selectedSchool._id}`
        await this.loadStudentAccount()
      },
    },
    selectedSchool: {
      async handler(val) {
        if (val) {
          await this.loadStudentAccount()
        } else {
          this.studentAccounts = []
          this.selectedSchool = null
        }
      },
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))
  },

  async mounted() {
    await this.loadSchools()
  },

  methods: {
    async loadSchools() {
      try {
        const { data } = await this.$axios.get('/schools/all')
        this.transformSchoolOptions(data)
      } catch (e) {
        this.error = e
      }
    },

    transformSchoolOptions(schools) {
      const scs = []
      schools.forEach((sc) => {
        scs.push({
          value: sc,
          label: sc.name,
          key: sc._id,
        })
      })
      this.schoolOptions = scs
    },

    show() {
      this.$refs.modal.show()
    },

    async reloadData() {
      await this.loadStudentAccount()
    },

    async loadStudentAccount() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${
        this.sortType
      }&schoolId=${this.selectedSchool?._id}`
      try {
        const { data } = await this.$axios.get(
          `/students/account?${this.params}`
        )
        this.isLoading = true
        await this.delay(500)
        this.studentAccounts = data.results
        this.totalRows = data.total
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    resetPassword(row) {
      this.$refs.resetPasswordModal.show({
        _id: row.item._id,
        fullName: row.item.fullName,
      })
    },
  },
}
</script>

<style lang="scss">
@import './assets/sass/init';
th {
  vertical-align: middle !important;
}

td {
  vertical-align: middle !important;
}
</style>
