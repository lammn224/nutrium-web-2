<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="isEdit ? 'Cập nhật bài tập' : 'Thêm mới bài tập'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @hidden="handleModalHidden"
    @ok="handleModalOk"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        v-model="form.name"
        :error="vForm.errors.get('name')"
        class="w-25"
        label="Tên bài tập"
        name="name"
        placeholder="Tên bài tập"
        required
        rules="required|max:100"
      />

      <base-form-text-input
        v-model="form.metIdx"
        :error="vForm.errors.get('metIdx')"
        class="w-25"
        label="Chỉ số MET"
        name="name"
        placeholder="Chỉ số MET"
        required
        rules="required|max:100"
      />

      <validation-provider
        v-slot="{ errors }"
        name="Mức vận động"
        rules="required"
      >
        <b-form-group label="Mức vận động" v-bind="$attrs">
          <b-form-select
            v-model="form.level"
            :options="levelOptions"
            :state="errors[0] || error !== null ? false : null"
          >
          </b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal.vue'
import BaseFormMixin from '~/components/base/form/Mixin.vue'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'
import {
  ACTIVITY_LEVEL,
  HEAVY,
  LIGHT,
  MODERATE,
} from '~/constants/level.constant'

const defaultForm = {
  name: '',
  metIdx: '',
  school: null,
  level: '',
}
export default {
  name: 'ActivityModal',
  mixins: [BaseFormModal, BaseFormMixin, NotifyMixin],
  data() {
    return {
      form: cloneDeep(defaultForm),
    }
  },

  computed: {
    levelOptions() {
      return [
        {
          value: HEAVY,
          text: ACTIVITY_LEVEL.get(HEAVY),
          key: HEAVY,
        },
        {
          value: MODERATE,
          text: ACTIVITY_LEVEL.get(MODERATE),
          key: MODERATE,
        },
        {
          value: LIGHT,
          text: ACTIVITY_LEVEL.get(LIGHT),
          key: LIGHT,
        },
      ]
    },
  },

  methods: {
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
      this.isEdit = false
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      if (this.$auth.user.school) {
        form.school = this.$auth.user.school._id
      }
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.post(this.$axios.defaults.baseURL + '/activities')
        this.$notifySuccess(this.notifyTitle, 'Thêm bài tập thành công!')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        this.vForm = new Form(form)
        await this.vForm.patch(
          this.$axios.defaults.baseURL + '/activities/' + this.form._id
        )

        this.$notifySuccess(this.notifyTitle, 'Cập nhật bài tập thành công!')
        this.$refs.modal.hide()
        this.onActionSuccess()
      } catch (e) {
        this.processError(e)
      }
    },
  },
}
</script>

<style lang="scss">
.el-input--suffix .el-input__inner {
  border-radius: 12px;
}
</style>
