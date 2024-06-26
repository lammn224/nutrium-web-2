<template>
  <content-card title="Danh sách tài khoản quản trị viên">
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
          :items="admins"
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
              variant="info"
              class="mr-1"
              @click="resetPassword(row.item)"
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

      <user-modal ref="modal" :on-action-success="reloadData" />

      <user-reset-password-modal
        ref="resetPasswordModal"
        :on-action-success="reloadData"
      />
    </template>
  </content-card>
</template>

<script>
import { ADMIN, SYSADMIN } from '~/constants/role.constant'
import { STATUS } from '~/constants/status.constant'

export default {
  name: 'SchoolUser',
  pageTitle: 'Quản lý tài khoản quản trị viên',
  data() {
    return {
      columns: [
        {
          field: 'fullName',
          key: 'a',
          title: 'Họ và tên',
          width: 200,
          align: 'left',
          sortBy: 'asc',
        },
        {
          field: 'phoneNumber',
          key: 'b',
          title: 'Số điện thoại',
          width: 200,
          align: 'left',
        },
        {
          field: '',
          key: 'action',
          title: 'Hành động',
          width: 100,
          align: 'center',
          fixed: 'right',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                <button
                  class="btn btn-sm btn-info"
                  on-click={() => this.resetPassword(row)}
                >
                  Đổi mật khẩu
                </button>
              </span>
            )
          },
        },
      ],
      admins: [],
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
      title: 'School User',
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
          key: 'fullName',
          label: 'Họ và tên',
          sortable: true,
          thStyle: { width: '25%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'phoneNumber',
          label: 'Số điện thoại',
          thStyle: { width: '25%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true, 'align-middle': true },
        },
        {
          key: 'action',
          label: 'Hành động',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
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
        await this.loadAdmins()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        await this.loadAdmins()
      },
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadAdmins()
  },

  methods: {
    show() {
      this.$refs.modal.show()
    },

    async reloadData() {
      // this.$refs.table.loadData()
      await this.loadAdmins()
    },

    resetPassword(user) {
      this.$refs.resetPasswordModal.show(user)
    },

    async loadAdmins() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${this.sortType}`

      this.isLoading = true
      await this.delay(500)

      try {
        const { data } = await this.$axios.get(
          `/school-users/admin?${this.params}`
        )

        this.admins = data.results
        this.totalRows = data.total
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
