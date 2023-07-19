<template>
  <b-modal
    ref="modal"
    :ok-title="'Sao chép'"
    :title="'Sao chép bữa ăn'"
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="lg"
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <validation-provider :vid="vid" name="Lựa chọn ngày" rules="required">
        <!--        <perfect-scrollbar class="mt-4">-->
        <div class="d-flex justify-content-between" style="width: 540px">
          <b-form-group
            label="Lựa chọn tuần nguồn"
            class="font-weight-bold"
            label-size="lg"
          >
            <el-date-picker
              v-model="form.srcWeek"
              type="week"
              size="large"
              placeholder="Pick a date"
              format="Tuần WW-yyyy"
              :picker-options="srcPickerOption"
            ></el-date-picker>
          </b-form-group>
          <b-form-group
            label="Lựa chọn tuần đích"
            class="font-weight-bold"
            label-size="lg"
          >
            <el-date-picker
              v-model="form.desWeek"
              type="week"
              size="large"
              placeholder="Pick a date"
              format="Tuần WW-yyyy"
              :picker-options="desPickerOption"
            ></el-date-picker>
          </b-form-group>
        </div>

        <b-form-group
          label="Lựa chọn ngày"
          class="font-weight-bold"
          label-size="lg"
        >
          <b-form-checkbox-group v-model="form.dayChecked" size="lg">
            <div class="row container-fluid">
              <div
                v-for="(day, idx) in dayOption"
                :key="idx"
                class="col-md-2 mb-1"
              >
                <b-form-checkbox :value="day.value">
                  {{ day.name }}
                </b-form-checkbox>
              </div>
            </div>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-invalid-feedback class="font-size-base" :state="false">
          Lưu ý: Thao tác này có thể xoá những bữa ăn đã thiết lập!
        </b-form-invalid-feedback>
        <!--        </perfect-scrollbar>-->
      </validation-provider>
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import BaseFormModal from '~/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'
import { ERROR_CODES } from '~/constants/error-code.constants'

const defaultForm = {
  srcWeek: '',
  desWeek: '',
  dayChecked: [],
}
export default {
  name: 'CloneMealModal',
  mixins: [BaseFormModal, BaseFormMixin, NotifyMixin],
  props: {
    momentDay: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dayOption: [
        { name: 'Thứ 2', value: 1 },
        { name: 'Thứ 3', value: 2 },
        { name: 'Thứ 4', value: 3 },
        { name: 'Thứ 5', value: 4 },
        { name: 'Thứ 6', value: 5 },
      ],
      srcPickerOption: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          if (new Date().getDay() === 6) {
            return time.getTime() > Date.now() + 86400000 * 2
          } else if (new Date().getDay() === 0) {
            return time.getTime() > Date.now() + 86400000
          } else if (new Date().getDay() === 1) {
            return time.getTime() > Date.now() - 86400000
          } else if (new Date().getDay() === 2) {
            return time.getTime() > Date.now() - 86400000 * 2
          } else if (new Date().getDay() === 3) {
            return time.getTime() > Date.now() - 86400000 * 3
          } else if (new Date().getDay() === 4) {
            return time.getTime() > Date.now() - 86400000 * 4
          } else if (new Date().getDay() === 5) {
            return time.getTime() > Date.now() - 86400000 * 5
          } else {
            return time.getTime() > Date.now()
          }
        },
      },
      desPickerOption: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          if (new Date().getDay() === 1) {
            return time.getTime() < Date.now() - 86400000
          } else if (new Date().getDay() === 2) {
            return time.getTime() < Date.now() - 86400000 * 2
          } else if (new Date().getDay() === 3) {
            return time.getTime() < Date.now() - 86400000 * 3
          } else if (new Date().getDay() === 4) {
            return time.getTime() < Date.now() - 86400000 * 4
          } else if (new Date().getDay() === 5) {
            return time.getTime() < Date.now() - 86400000 * 5
          } else {
            return time.getTime() < Date.now()
          }
        },
      },
      form: cloneDeep(defaultForm),
    }
  },

  // watch: {
  //   'form.dayChecked': {
  //     handler(newVal, oldVal) {
  //       console.log(newVal)
  //     },
  //     deep: true,
  //   },
  // },

  methods: {
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
      this.isEdit = false
      this.error = null
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      form.srcWeek = this.form.srcWeek.getTime() - 86400000
      form.desWeek = this.form.desWeek.getTime() - 86400000
      return form
    },

    async addItem() {
      try {
        const form = this.processFormToSubmit()
        // form.date = convertStringToTimeStamps(form.date)
        this.vForm = new Form(form)

        await this.vForm.post(
          this.$axios.defaults.baseURL + '/meals/clone-meal-last-week'
        )
        this.$notifySuccess(this.notifyTitle, 'Thêm món ăn thành công!')
        this.$refs.modal.hide()
        this.form = cloneDeep(defaultForm)

        this.$bus.$emit('reloadMealData')
      } catch (e) {
        // this.$refs.modal.hide()
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
      }
    },
  },
}
</script>
