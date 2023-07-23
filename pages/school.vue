<template>
  <div>
    <content-card title="Danh sách trường học">
      <template #toolbar>
        <b-button variant="primary" size="sm" @click="show">
          <i class="flaticon2-plus"></i> Thêm mới
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
            :items="schools"
            :fields="fields"
            :current-page="curPage"
            :per-page="0"
            :busy="isLoading"
            thead-class="font-weight-bold font-size-lg text-center"
          >
            <template #empty>
              <h4 class="text-center">Không có dữ liệu</h4>
            </template>
            <template #cell(status)="row">
              <span :class="getStatusClass(row.item.status)">{{
                STATUS.get(row.item.status)
              }}</span>
            </template>
            <template #cell(action)="row">
              <b-button
                size="sm"
                variant="primary"
                class="mr-1"
                @click="updateSchool(row)"
                >Cập nhật</b-button
              >
              <b-button
                ref="approveBtn"
                size="sm"
                variant="info"
                class="mr-1"
                @click="approve(row)"
                >Phê duyệt</b-button
              >
              <!--              <b-button-->
              <!--                size="sm"-->
              <!--                variant="danger"-->
              <!--                class="mr-1"-->
              <!--                @click="deleteSchool(data)"-->
              <!--              >-->
              <!--                Xoá-->
              <!--              </b-button>-->
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
      </template>
    </content-card>

    <school-modal ref="modal" :on-action-success="reloadData"></school-modal>
  </div>
</template>

<script>
import { ACTIVE, PENDING, STATUS } from '~/constants/status.constant'
import NotifyMixin from '~/components/base/form/NotifyMixin'
import { ERROR_CODES } from '~/constants/error-code.constants'

export default {
  name: 'ApplicationPage',
  mixins: [NotifyMixin],
  data() {
    return {
      schools: [],
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
          key: 'name',
          label: 'Tên trường',
          sortable: true,
          thStyle: { width: '25%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'font-weight-bold': true },
        },
        {
          key: 'code',
          label: 'Mã trường',
          thStyle: { width: '10%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'status',
          label: 'Trạng thái',
          thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'manager.fullName',
          label: 'Người quản lý',
          thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
        },
        {
          key: 'manager.phoneNumber',
          label: 'Số điện thoại',
          thStyle: { width: '15%', fontSize: '17px', fontWeight: 'bold' },
          tdClass: { 'text-center': true },
        },
        {
          key: 'action',
          label: 'Hành động',
          thStyle: { width: '35%', fontSize: '17px', fontWeight: 'bold' },
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
        await this.loadSchools()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${this.sortType}`
        await this.loadSchools()
      },
    },
  },

  created() {
    this.loadSchools()
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))
  },

  methods: {
    show() {
      this.$refs.modal.show()
    },

    async reloadData() {
      await this.loadSchools()
    },

    async loadSchools() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${this.sortType}`
      try {
        const { data } = await this.$axios.get(`/schools?${this.params}`)
        this.isLoading = true
        await this.delay(500)
        this.schools = data.results
        this.totalRows = data.total
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    approve(row) {
      if (row.item.status === PENDING) {
        this.$bvModal
          .msgBoxConfirm(
            `Bạn chắc chắn muốn phê duyệt trường học ${row.item.name}`,
            {
              title: this.warning,
              // size: "mm",
              buttonSize: 'sm',
              okVariant: 'primary',
              okTitle: this.accept,
              cancelTitle: this.revoke,
            }
          )
          .then(async (value) => {
            if (value) {
              await this.$axios.post(`/schools/approve/${row.item._id}`)
              this.$notifySuccess(
                this.notifyTitle,
                'Phê duyệt trường học thành công!'
              )
              await this.loadSchools()
            }
          })
          .catch((e) => {
            if (e.response) {
              if (e.response.status === 422) {
                this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
              } else if (e.response.status === 500) {
                this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
              } else {
                this.$notifyTryAgain(
                  this.notifyTitle,
                  ERROR_CODES.get(e.response.data.code)
                )
              }
            } else {
              this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
            }
          })
      }
    },

    updateSchool(row) {},

    // deleteSchool(data) {
    // },

    getStatusClass(status) {
      return status === ACTIVE
        ? 'text-success'
        : status === PENDING
        ? 'text-danger'
        : 'text-warning'
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
