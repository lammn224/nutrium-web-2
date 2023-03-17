<template>
  <b-modal
    ref="modal"
    :ok-title="'Thêm mới'"
    :title="'Thêm mới lớp học'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-close-on-esc
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <validation-provider
        v-slot="{ errors }"
        name="File"
        rules="required|ext:xlsx"
      >
        <b-form-group v-bind="$attrs">
          <b-form-file
            ref="fileInput"
            v-model="fileExcel"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-file>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>

          <div class="mt-3">
            Selected file: {{ fileExcel ? fileExcel.name : '' }}
          </div>
        </b-form-group>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Khối lớp" rules="required">
        <b-form-group v-if="!isEdit" v-bind="$attrs" label="Khối lớp">
          <b-form-select
            v-model="grade"
            :options="gradeOption"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
    </validation-observer>
    <template #modal-footer>
      <button
        ref="cancelClassBtn"
        v-b-modal.modal-close_visit
        class="btn btn-secondary m-1"
        @click="handleModalHidden"
      >
        Huỷ bỏ
      </button>
      <button
        ref="addClassBtn"
        v-b-modal.modal-close_visit
        class="btn btn-primary m-1"
        @click="handleModalOk"
      >
        Thêm mới
      </button>
    </template>
  </b-modal>
</template>

<script>
import BaseFormModal from '~/components/base/form/Modal'
import { ERROR_CODES } from '~/constants/error-code.constants'

export default {
  name: 'ClassModal',
  mixins: [BaseFormModal],
  data() {
    return {
      fileExcel: null,
      error: null,
      grade: '',
      gradeOption: [],
    }
  },
  computed: {
    uploadHeaders() {
      return {
        Authorization: this.$auth.strategy.token.get(),
      }
    },
  },

  mounted() {
    this.loadGradeOption()
  },

  methods: {
    async loadGradeOption() {
      const { data } = await this.$axios.get('/grade')

      const grades = data.results

      grades.forEach((grade) => {
        this.gradeOption.push({ value: grade._id, text: grade.name })
      })
    },

    handleModalHidden(bvModalEvt) {
      this.$refs.modal.hide()
      this.fileExcel = null
      this.grade = ''
    },

    async handleModalOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      await this.validateForm()
    },

    async validateForm() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        await this.addItem()
      }
    },

    async addItem() {
      const addBtn = this.$refs.addClassBtn
      const cancelBtn = this.$refs.cancelClassBtn
      const fileInput = this.$refs.fileInput
      addBtn.disabled = true
      cancelBtn.disabled = true
      fileInput.disabled = true

      try {
        addBtn.classList.add('spinner', 'spinner-light', 'spinner-right')
        const formData = new FormData()
        formData.append('file', this.fileExcel)
        formData.append('grade', this.grade)

        await this.$axios.post('files/upload-excel', formData, {
          headers: {
            ...this.headers,
            ...this.uploadHeaders,
            'content-type': 'multipart/form-data',
          },
        })

        addBtn.classList.remove('spinner', 'spinner-light', 'spinner-right')
        addBtn.disabled = false
        cancelBtn.disabled = false

        this.$notifyAddSuccess('lớp học')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        addBtn.classList.remove('spinner', 'spinner-light', 'spinner-right')
        addBtn.disabled = false
        cancelBtn.disabled = false
        this.$notifyErrMsg(ERROR_CODES.get(e.response.data.code))
      }
    },
  },
}
</script>
