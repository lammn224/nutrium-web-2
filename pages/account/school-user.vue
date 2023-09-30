<template>
  <div>
    <content-card title="Danh sách tài khoản">
      <template #body>
        <div class="d-flex justify-content-between">
          <div class="d-flex mb-5">
            <div>
              <div>
                <label class="font-weight-bold font-size-lg">Trường học</label>
              </div>
              <el-select
                v-model="selectedSchool"
                :placeholder="'Chọn trường học'"
                class="pr-5"
                clearable
                filterable
                value-key="_id"
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
            <div>
              <div>
                <label class="font-weight-bold font-size-lg">Vai trò</label>
              </div>
              <el-select
                v-model="selectedRole"
                :placeholder="'Chọn vai trò'"
                class="pr-5"
                clearable
                filterable
                value-key="_id"
              >
                <el-option
                  v-for="item in roleOptions"
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
          rounded="sm"
          spinner-small
          spinner-type="grow"
          spinner-variant="primary"
        >
          <b-table
            ref="table"
            :busy="isLoading"
            :current-page="curPage"
            :fields="fields"
            :items="parentsAccounts"
            :per-page="0"
            bordered
            head-variant="light"
            hover
            show-empty
            thead-class="font-weight-bold font-size-lg text-center"
          >
            <template #empty>
              <h4 class="text-center">Không có dữ liệu</h4>
            </template>
            <template #cell(role)="row">
              <span>{{ ROLES.get(row.item.role) }}</span>
            </template>
            <template #cell(action)="row">
              <b-button
                class="mr-1"
                size="sm"
                variant="info"
                @click="resetPassword(row)"
                >Đổi mật khẩu
              </b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="curPage"
            :per-page="limit"
            :total-rows="totalRows"
            class="justify-content-end"
            pills
          ></b-pagination>
        </b-overlay>

        <user-reset-password-modal
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
import { ADMIN, PARENTS, ROLES } from '~/constants/role.constant'

export default {
  name: 'ParentsAccountPage',
  mixins: [NotifyMixin],
  data() {
    return {
      parentsAccounts: [],
      selectedSchool: null,
      selectedRole: '',
      schoolOptions: [],
      role: '',
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
    roleOptions() {
      return [
        {
          value: ADMIN,
          label: ROLES.get(ADMIN),
          key: ADMIN,
        },
        {
          value: PARENTS,
          label: ROLES.get(PARENTS),
          key: PARENTS,
        },
      ]
    },
    ROLES() {
      return ROLES
    },
    fields() {
      return [
        {
          key: 'phoneNumber',
          label: 'Số điện thoại',
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
          key: 'role',
          label: 'Vai trò',
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
        }&schoolId=${this.selectedSchool._id}&role=${this.selectedRole}`
        await this.loadParentsAccount()
      },
    },
    keyword: {
      async handler(value) {
        this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
          this.limit
        }&keyword=${value}&sortBy=${this.sortBy}&sortType=${
          this.sortType
        }&schoolId=${this.selectedSchool._id}&role=${this.selectedRole}`
        await this.loadParentsAccount()
      },
    },
    selectedSchool: {
      async handler(val) {
        if (val) {
          await this.loadParentsAccount()
        } else {
          this.parentsAccounts = []
          this.selectedSchool = null
        }
      },
    },
    selectedRole: {
      async handler(val) {
        if (this.selectedSchool) {
          await this.loadParentsAccount()
        } else {
          // this.parentsAccounts = []
          // this.selectedSchool = null
        }
      },
    },
  },

  created() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    this.loadSchools()
  },

  // async mounted() {
  //   await this.loadSchools()
  // },

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
      await this.loadParentsAccount()
    },

    async loadParentsAccount() {
      this.params = `offset=${(this.curPage - 1) * this.limit}&limit=${
        this.limit
      }&keyword=${this.keyword}&sortBy=${this.sortBy}&sortType=${
        this.sortType
      }&schoolId=${this.selectedSchool?._id}&role=${this.selectedRole}`
      this.isLoading = true
      await this.delay(500)

      try {
        const { data } = await this.$axios.get(
          `/school-users/account?${this.params}`
        )
        this.parentsAccounts = data.results
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
