<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật lớp học' : 'Thêm mới lớp học'"
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
        :vid="vid"
        :name="$attrs.label ? $attrs.label : $attrs['label-name']"
        rules="required|ext:xlsx"
      >
        <b-form-group
          v-bind="$attrs"
          :label-class="required ? 'required' : null"
          :class="formClass"
        >
          <b-form-file
            v-model="fileExcel"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-file>
          <div class="mt-3">
            Selected file: {{ fileExcel ? fileExcel.name : '' }}
          </div>

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
import BaseFormMixin from '~/components/base/form/Mixin.vue'

export default {
  name: 'ClassModal',
  mixins: [BaseFormModal, BaseFormMixin],
  data() {
    return {
      fileExcel: null,
    }
  },
  methods: {
    handleModalHidden(bvModalEvt) {
      this.$refs.modal.hide()
      this.isEdit = false
      this.fileExcel = null
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
      addBtn.disabled = true
      cancelBtn.disabled = true

      try {
        addBtn.classList.add('spinner', 'spinner-light', 'spinner-right')
        const formData = new FormData()
        formData.append('file', this.fileExcel)

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
        console.log(e)
        addBtn.classList.remove('spinner', 'spinner-light', 'spinner-right')
        addBtn.disabled = false
        cancelBtn.disabled = false
        this.processError(e)
      }
    },
  },
}
</script>
