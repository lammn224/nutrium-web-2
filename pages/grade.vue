<template>
  <content-card title="Danh sách khối lớp">
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
          :items="grades"
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
          <template #cell(action)="row">
            <b-button
              size="sm"
              variant="primary"
              class="mr-1"
              @click="editGrade(row.item)"
              >Cập nhật</b-button
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

      <grade-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'GradePage',
  pageTitle: 'Quản lý khối lớp',
  data() {
    return {
      grades: [],
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
      title: 'Grades',
    }
  },

  computed: {
    ADMIN() {
      return ADMIN
    },

    fields() {
      return [
        {
          key: 'idx',
          label: 'STT',
          thStyle: { width: '5%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'name',
          label: 'Tên khối lớp',
          sortable: true,
          thStyle: { width: '20%', fontSize: '17px', fontWeight: 'bold' },
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
        }`
        await this.loadGrades()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        await this.loadGrades()
      },
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadGrades()
  },

  methods: {
    async loadGrades() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${this.sortType}`

      this.isLoading = true
      await this.delay(500)

      try {
        const { data } = await this.$axios.get(`/grade?${this.params}`)

        this.grades = data.results
        this.totalRows = data.total
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    show() {
      this.$refs.modal.show()
    },

    async reloadData() {
      await this.loadGrades()
    },

    editGrade(grade) {
      this.$refs.modal.show(grade)
    },
  },
}
</script>
