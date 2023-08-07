<template>
  <content-card title="Danh sách tài khoản học sinh">
    <template #toolbar>
      <b-button
        v-if="$auth.user.role === ADMIN"
        variant="primary"
        @click="show()"
      >
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <b-overlay
        :show="isLoading"
        spinner-variant="primary"
        spinner-type="grow"
        spinner-small
        rounded="sm"
      >
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
        <b-table
          ref="table"
          hover
          bordered
          show-empty
          head-variant="light"
          :items="students"
          :fields="fields"
          :current-page="curPage"
          :per-page="0"
          :busy="isLoading"
          thead-class="font-weight-bold font-size-lg text-center"
        >
          <template #empty>
            <h4 class="text-center">Không có dữ liệu</h4>
          </template>
          <template #cell(idx)="row">
            {{ ++row.index + limit * (curPage - 1) }}
          </template>
          <template #cell(dateOfBirth)="row">
            {{ convertTimeStampsToString(row.item.dateOfBirth) }}
          </template>
          <template #cell(class)="row">
            {{ row.item.class.name }}
          </template>
          <template #cell(action)="row">
            <b-button
              size="sm"
              variant="info"
              class="mr-1"
              @click="resetPassword(row.item)"
              >Đổi mật khẩu</b-button
            >
            <b-button
              size="sm"
              variant="primary"
              class="mr-1"
              @click="getDetailsStudent(row.item)"
            >
              Chi tiết
            </b-button>
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

      <student-modal ref="modal" :on-action-success="reloadData" />

      <student-reset-password-modal
        ref="resetPasswordModal"
        :on-action-success="reloadData"
      />
    </template>
  </content-card>
</template>

<script>
import { ADMIN, SYSADMIN } from '~/constants/role.constant'
import { convertTimeStampsToString } from '~/services/convertTimeStamps.service'
import { STATUS } from '~/constants/status.constant'

export default {
  name: 'StudentPage',
  pageTitle: 'Quản lý tài khoản học sinh',
  data() {
    return {
      students: [],
      curPage: 1,
      keyword: '',
      totalRows: 0,
      limit: 10,
      params: '',
      isLoading: false,
      delay: null,
      sortBy: 'fullName',
      sortType: 'asc',
    }
  },
  head() {
    return {
      title: 'Student',
    }
  },

  computed: {
    STATUS() {
      return STATUS
    },
    SYSADMIN() {
      return SYSADMIN
    },
    ADMIN() {
      return ADMIN
    },
    fields() {
      return [
        {
          key: 'idx',
          label: 'STT',
          thStyle: { width: '3%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'studentId',
          label: 'Mã học sinh',
          sortable: true,
          thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'fullName',
          label: 'Họ và tên',
          sortable: true,
          thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'dateOfBirth',
          label: 'Ngày sinh',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'class',
          label: 'Lớp',
          thStyle: { width: '7%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'action',
          label: 'Hành động',
          thStyle: { width: '25%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
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
        }`
        await this.loadStudents()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        await this.loadStudents()
      },
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadStudents()
  },

  methods: {
    convertTimeStampsToString,

    show() {
      this.$refs.modal.show()
    },

    async reloadData() {
      // this.$refs.table.loadData()
      await this.loadStudents()
    },

    async loadStudents() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${this.sortType}`

      this.isLoading = true
      await this.delay(500)

      try {
        const { data } = await this.$axios.get(`/students?${this.params}`)

        this.students = data.results
        this.totalRows = data.total
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    resetPassword(user) {
      this.$refs.resetPasswordModal.show(user)
    },

    getDetailsStudent(row) {
      this.$router.push({ path: `/student/${row._id}` })
    },
  },
}
</script>
