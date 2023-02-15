<template>
  <content-card title="Danh sách lớp học">
    <template #toolbar>
      <b-button variant="primary" @click="show()">
        <i class="flaticon2-plus" /> Thêm mới
      </b-button>
    </template>
    <template #body>
      <div ref="datatable">
        <ve-table
          :style="{ 'word-break': 'break-all' }"
          :columns="tableColumns"
          :sort-option="sortOption"
          :table-data="tableData"
          :row-style-option="rowStyleOption"
          :max-height="650"
          border-y
        />
      </div>

      <class-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import 'vue-easytable/libs/theme-default/index.css'
import { VeTable, VeLoading } from 'vue-easytable'

export default {
  name: 'ClassPage',
  components: {
    VeTable,
  },
  pageTitle: 'Quản lý món ăn',
  data() {
    return {
      remoteUrl: '/classes',
      loadingInstance: null,
      loading: true,
      firstLoading: false,
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
      },
      tableData: [],
      totalRecord: 0,
      currentPage: 1,
      limit: 10,
      sortObj: null,
      sortOption: {
        sortAlways: true,
        sortChange: (params) => {
          this.sortChange(params)
        },
      },
    }
  },
  head() {
    return {
      title: 'Classes',
    }
  },
  computed: {
    tableColumns() {
      return [
        {
          field: '',
          key: 'stt',
          title: 'STT',
          width: 50,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return ++rowIndex
          },
        },
        {
          field: 'name',
          key: 'a',
          title: 'Tên lớp',
          width: 200,
          align: 'left',
          sortBy: 'asc',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span
                style="cursor: pointer;"
                on-click={() => this.handleClick(row._id)}
              >
                {row.name}
              </span>
            )
          },
        },
        {
          field: 'member',
          key: 'b',
          title: 'Sĩ số',
          width: 200,
          align: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span>{row.members.length}</span>
          },
        },
      ]
    },
    queryUrl() {
      let url = this.remoteUrl

      const params = new URLSearchParams({
        limit: this.limit,
        offset: (this.currentPage - 1) * this.limit,
      })

      if (this.sortObj) {
        params.append('sortBy', this.sortObj.sortBy)
        params.append('sortType', this.sortObj.sortType)
      }

      const paramsStr = params.toString()

      url += '?' + paramsStr

      return url
    },
  },
  watch: {
    loading(val) {
      if (val) {
        this.loadingInstance.show()
      } else {
        this.loadingInstance.close()
      }
    },
    queryUrl() {
      this.loadData()
    },
  },
  created() {
    this.sortObj = this.getFirstSortObj()
  },
  mounted() {
    this.loadingInstance = VeLoading({
      target: this.$refs.datatable,
      name: null,
    })

    this.loadData()
  },
  methods: {
    async loadData() {
      this.loadingInstance.show()

      try {
        const { data } = await this.$axios.get(this.queryUrl)

        this.tableData = data.results
        this.totalRecord = data.total
      } catch (e) {
        this.tableData = []
        this.totalRecord = 0
      } finally {
        this.loadingInstance.close()
        this.firstLoading = true
      }
    },
    sortChange(params) {
      let prop, type
      for (const key in params) {
        if (params[key]) {
          type = params[key]
          prop = key
          break
        }
      }
      this.sortObj = {
        sortBy: prop,
        sortType: type,
      }
    },
    getFirstSortObj() {
      const sortCol = this.tableColumns.find((item) => item.sortBy)

      if (sortCol) {
        return {
          sortBy: sortCol.field,
          sortType: sortCol.sortBy,
        }
      }

      return null
    },
    show() {
      this.$refs.modal.show()
    },
    reloadData() {
      this.loadData()
    },
    handleClick(rowVal) {
      this.$router.push({ path: `/class/${rowVal}` })
    },
  },
}
</script>
