<template>
  <content-card :title="tableTitle">
    <template #body>
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
          sticky-header="600px"
          :no-border-collapse="true"
          head-variant="light"
          :items="students"
          :fields="fields"
          :busy="isLoading"
          thead-class="font-weight-bold font-size-lg text-center"
        >
          <template #empty>
            <h4 class="text-center">Không có dữ liệu</h4>
          </template>
          <template #cell(idx)="row">
            {{ ++row.index }}
          </template>
          <template #cell(dateOfBirth)="row">
            {{ convertTimeStampsToString(row.item.dateOfBirth) }}
          </template>
          <template #cell(gender)="row">
            <span>{{ GENDER.get(row.item.gender) }}</span>
          </template>
          <template #cell(action)="row">
            <b-button
              size="sm"
              variant="info"
              class="mr-1"
              @click="getDetailsStudent(row.item._id)"
              >Chi tiết</b-button
            >
          </template>
        </b-table>
      </b-overlay>
    </template>
  </content-card>
</template>

<script>
import { GENDER } from '~/constants/gender.constant'
import { convertTimeStampsToString } from '~/services/convertTimeStamps.service'

export default {
  data() {
    return {
      class: null,
      tableTitle: 'Danh sách lớp học: ',
      students: [],
      isLoading: false,
      delay: null,
      sortBy: 'name',
      sortType: 'asc',
    }
  },

  // async fetch() {
  //   await this.detailsClass()
  // },

  head() {
    return {
      title: 'Class',
    }
  },

  computed: {
    GENDER() {
      return GENDER
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
          key: 'dateOfBirth',
          label: 'Ngày sinh',
          thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'gender',
          label: 'Giới tính',
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

  created() {
    this.detailsClass()
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))
  },

  methods: {
    convertTimeStampsToString,

    async detailsClass() {
      const params = this.$route.params
      try {
        const { data } = await this.$axios.get(`classes/${params.slug}`)
        this.isLoading = true
        await this.delay(500)
        this.class = data
        this.tableTitle += data.name
        this.tableData = data.members
        this.students = data.members
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    getDetailsStudent(studentId) {
      this.$router.push({ path: `/student/${studentId}` })
    },
  },
}
</script>

<style>
.b-table-sticky-header > .table.b-table > thead > tr > th {
  position: sticky !important;
}
</style>
