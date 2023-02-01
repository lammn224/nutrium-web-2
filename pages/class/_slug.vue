<template>
  <content-card title="Danh sách lớp học">
    <template #body>
      <ve-table
        :style="{ 'word-break': 'break-all' }"
        :columns="tableColumns"
        :sort-option="sortOption"
        :table-data="tableData"
        :row-style-option="rowStyleOption"
        :max-height="650"
        border-y
      />
    </template>
  </content-card>
</template>

<script>
import { VeTable } from 'vue-easytable'
import { MALE } from '~/constants/gender.constant'

export default {
  components: {
    VeTable,
  },
  data() {
    return {
      tableData: [],
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
      },
      sortObj: null,
      sortOption: {
        sortAlways: true,
        sortChange: (params) => {
          this.sortChange(params)
        },
      },
    }
  },

  async fetch() {
    await this.detailsClass()
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
          field: 'studentId',
          key: 'id',
          title: 'Mã học sinh',
          width: 200,
          align: 'left',
          sortBy: 'asc',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return row.studentId
          },
        },
        {
          field: 'fullName',
          key: 'a',
          title: 'Họ tên',
          width: 200,
          align: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return row.fullName
          },
        },
        {
          field: 'dateOfBirth',
          key: 'b',
          title: 'Ngày sinh',
          width: 200,
          align: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return row.dateOfBirth
          },
        },
        {
          field: 'gender',
          key: 'c',
          title: 'Giới tính',
          width: 200,
          align: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return row.gender === MALE ? 'Nam' : 'Nữ'
          },
        },
        // {
        //   field: 'member',
        //   key: 'b',
        //   title: 'Sĩ số',
        //   width: 200,
        //   align: 'left',
        //   renderBodyCell: ({ row, column, rowIndex }, h) => {
        //     return <span>{row.members.length}</span>
        //   },
        // },
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

  created() {
    this.sortObj = this.getFirstSortObj()
  },

  methods: {
    async detailsClass() {
      const params = this.$route.params
      const { data } = await this.$axios.get(`classes/${params.slug}`)
      this.tableData = data.members
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
  },
  // watch: {
  //   '$route.params': '$fetch'
  // }
}
</script>
