<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="
      !isEdit
        ? 'Thêm mới bữa ăn'
        : $auth.user._id !== form.createdBy
        ? 'Xem bữa ăn'
        : 'Cập nhật bữa ăn'
    "
    cancel-title="Hủy bỏ"
    no-close-on-backdrop
    no-enforce-focus
    size="xl"
    :hide-footer="
      $auth.user._id !== form.createdBy ||
      convertStringToTimeStamps(form.date) <
        convertStringToTimeStamps(dateToString(new Date()))
    "
    @ok="handleModalOk"
    @hidden="handleModalHidden"
  >
    <validation-observer ref="observer">
      <validation-provider
        v-if="isEdit"
        v-slot="{ errors }"
        name="Loại bữa ăn"
        rules="required"
      >
        <b-form-group v-if="isEdit" v-bind="$attrs" label="Loại bữa ăn">
          <b-form-select
            v-model="form.type"
            :options="isEditOptions"
            :state="errors[0] || error !== null ? false : null"
            disabled
          >
          </b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        v-if="!isEdit"
        v-slot="{ errors }"
        name="Loại bữa ăn"
        rules="required"
      >
        <b-form-group v-if="!isEdit" v-bind="$attrs" label="Loại bữa ăn">
          <b-form-select
            v-model="form.type"
            :options="options"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <base-form-text-input
        v-model="form.date"
        required
        :error="vForm.errors.get('date')"
        placeholder="Ngày"
        disabled
        label="Ngày"
        rules="required|max:100"
        name="name"
        class="w-25"
      />

      <!--      <base-form-text-input-->
      <!--        v-model="form.topic"-->
      <!--        :error="vForm.errors.get('topic')"-->
      <!--        placeholder="Chủ đề"-->
      <!--        label="Chủ đề"-->
      <!--        name="topic"-->
      <!--        class="w-25"-->
      <!--      />-->

      <validation-provider
        v-if="form.createdBy === $auth.user._id && $auth.user.role !== ADMIN"
        v-slot="{ errors }"
        name="Học sinh"
        rules="required"
      >
        <b-form-group
          v-if="$auth.user.role !== ADMIN"
          v-bind="$attrs"
          label="Chọn học sinh"
        >
          <b-form-select
            v-model="form.student"
            :options="studentOption"
            :disabled="isEdit"
            :state="errors[0] || error !== null ? false : null"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ errors[0] || error }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <div
        v-if="
          ((selectedStudent || form.student) && $auth.user.child) ||
          selectedStudent
        "
        class="row"
      >
        <div class="col-xl-4">
          <base-form-text-input
            :value="`${selectedStudent.rcmCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="Năng lượng khuyến nghị"
            name="name"
          />
        </div>

        <div class="col-xl-4">
          <base-form-text-input
            :value="`40% ~ ${selectedStudent.maxBreakfastCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="% Năng lượng khuyến nghị bữa sáng"
            name="name"
          />
        </div>

        <div class="col-xl-4">
          <base-form-text-input
            :value="`25% ~ ${selectedStudent.maxDinnerCalories} kcal`"
            disabled
            placeholder="KNNL"
            label="% Năng lượng khuyến nghị bữa tối"
            name="name"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Năng lượng"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Năng lượng (kcal)">
              <b-form-input
                v-model="form.power"
                class="border border-2 border-primary"
                disabled
                placeholder="Năng lượng"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Protein"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Protein (g)">
              <b-form-input
                v-model="form.protein"
                class="border border-2 border-primary"
                disabled
                placeholder="Protein"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Lipid"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Lipid (g)">
              <b-form-input
                v-model="form.lipid"
                class="border border-2 border-primary"
                disabled
                placeholder="Lipid"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Glucid"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Glucid (g)">
              <b-form-input
                v-model="form.glucid"
                class="border border-2 border-primary"
                disabled
                placeholder="Glucid"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Canxi"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Canxi (mg)">
              <b-form-input
                v-model="form.ca"
                class="border border-2 border-primary"
                disabled
                placeholder="Canxi"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Sắt"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Sắt (mg)">
              <b-form-input
                v-model="form.fe"
                class="border border-2 border-primary"
                disabled
                placeholder="Sắt"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Chất xơ"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Chất xơ (g)">
              <b-form-input
                v-model="form.fiber"
                class="border border-2 border-primary"
                disabled
                placeholder="Chất xơ"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
        <div class="col-xl-3">
          <validation-provider
            v-slot="{ errors }"
            name="Kẽm"
            rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
          >
            <b-form-group v-bind="$attrs" label="Kẽm (mg)">
              <b-form-input
                v-model="form.zn"
                class="border border-2 border-primary"
                disabled
                placeholder="Kẽm"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ errors[0] || error }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
      </div>

      <div>
        <div
          v-for="(selectValue, index) in selectValues"
          :key="index"
          class="row"
        >
          <div class="col-xl-7">
            <food-select
              v-model="selectValues[index]"
              required
              :filtered-foods="filteredFoods"
              placeholder="Món ăn"
              label="Món ăn"
              rules="required"
              name="food"
              :class="
                $auth.user.role === STUDENT || $auth.user._id !== form.createdBy
                  ? 'font-weight-bold text-dark'
                  : ''
              "
              :disabled="
                $auth.user.role === STUDENT ||
                $auth.user._id !== form.createdBy ||
                convertStringToTimeStamps(form.date) <
                  convertStringToTimeStamps(dateToString(new Date()))
              "
              @input="onSelectChange(index)"
            />
          </div>
          <div class="col-xl-3">
            <base-form-text-input
              v-model="inputValues[index]"
              required
              :disabled="
                selectValues[index] === '' ||
                $auth.user.role === STUDENT ||
                $auth.user._id !== form.createdBy ||
                convertStringToTimeStamps(form.date) <
                  convertStringToTimeStamps(dateToString(new Date()))
              "
              placeholder="Khối lượng (gam)"
              label="Khối lượng (gam)"
              rules="required|max:100|regex:^[-+]?\d+(\.\d+)?$"
              name="name"
              class="w-25"
            />
          </div>
          <div class="col-xl-2 pt-9">
            <b-button
              :disabled="
                $auth.user.role === STUDENT ||
                $auth.user._id !== form.createdBy ||
                convertStringToTimeStamps(form.date) <
                  convertStringToTimeStamps(dateToString(new Date()))
              "
              @click="removeSelect(index)"
              >Xoá</b-button
            >
          </div>
        </div>
        <b-button
          :disabled="
            $auth.user.role === STUDENT ||
            $auth.user._id !== form.createdBy ||
            convertStringToTimeStamps(form.date) <
              convertStringToTimeStamps(dateToString(new Date()))
          "
          @click="addSelect"
          >Thêm món ăn</b-button
        >
      </div>
    </validation-observer>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { Form } from 'vform'
import { mapGetters } from 'vuex'
import BaseFormModal from '~/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin'
import { ADMIN, PARENTS, STUDENT } from '~/constants/role.constant'
import {
  BREAKFAST,
  DINNER,
  LAUNCH,
  MEALS,
} from '~/constants/meal-type.constant'
import {
  convertStringToTimeStamps,
  dateToString,
} from '~/services/convertTimeStamps.service'
import { ERROR_CODES } from '~/constants/error-code.constants'
import NotifyMixin from '~/components/base/form/NotifyMixin.vue'

const defaultForm = {
  type: MEALS.get(LAUNCH),
  date: '',
  power: '0',
  protein: '0',
  lipid: '0',
  glucid: '0',
  ca: '0',
  fe: '0',
  fiber: '0',
  zn: '0',
  student: null,
  foods: [],
  values: [],
  isCreatedByAdmin: null,
  // topic: '',
}
export default {
  name: 'MealModalThird',
  mixins: [BaseFormModal, BaseFormMixin, NotifyMixin],
  props: {
    momentDay: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectValues: [],
      inputValues: [],
      canAddSelect: true,
      selected: null,
      filteredFoods: null,

      isEditOptions: [
        { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
        { value: LAUNCH, text: MEALS.get(LAUNCH) },
        { value: DINNER, text: MEALS.get(DINNER) },
      ],
      form: cloneDeep(defaultForm),
      studentOption: [],
      selectedStudent: null,
    }
  },
  computed: {
    ...mapGetters({
      foods: 'food/foods',
    }),

    STUDENT() {
      return STUDENT
    },

    PARENTS() {
      return PARENTS
    },
    ADMIN() {
      return ADMIN
    },

    options() {
      return this.$auth.user.role === ADMIN
        ? [{ value: LAUNCH, text: MEALS.get(LAUNCH) }]
        : this.momentDay.date.locale('en').format('ddd') === 'Sun' ||
          this.momentDay.date.locale('en').format('ddd') === 'Sat'
        ? [
            { value: LAUNCH, text: MEALS.get(LAUNCH) },
            { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
            { value: DINNER, text: MEALS.get(DINNER) },
          ]
        : [
            { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
            { value: DINNER, text: MEALS.get(DINNER) },
          ]
    },
  },
  watch: {
    'form.student': {
      handler(newVal, oldVal) {
        if (this.$auth.user.role === PARENTS) {
          this.selectedStudent = this.$auth.user.child.find(
            (item) => item._id === newVal
          )
        }

        if (this.$auth.user.role === STUDENT) {
          this.selectedStudent = this.$auth.user.parents.child.find(
            (item) => item._id === newVal
          )
        }
      },
      deep: true,
    },

    // 'form.topic': {
    //   handler(newVal, oldVal) {
    //     if(newVal) {
    //       this.filteredFoods = [this.foods[0], this.foods[1], this.foods[2]]
    //     } else {
    //       this.filteredFoods = [...this.foods]
    //     }
    //   },
    //   deep: true,
    // },

    foods: {
      handler(newVal, oldVal) {
        this.filteredFoods = newVal
      },
      deep: true,
    },

    inputValues: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.form.power = '0'
          this.form.protein = '0'
          this.form.lipid = '0'
          this.form.glucid = '0'
          this.form.ca = '0'
          this.form.fe = '0'
          this.form.fiber = '0'
          this.form.zn = '0'
          if (newVal && newVal.length && newVal[0] !== '') {
            let sumPower = 0
            let sumProtein = 0
            let sumLipid = 0
            let sumGlucid = 0
            let sumCa = 0
            let sumFe = 0
            let sumFiber = 0
            let sumZn = 0
            for (let i = 0; i < newVal.length; i++) {
              if (this.selectValues[i] && this.selectValues[i] !== '') {
                sumPower = (
                  parseFloat(sumPower) +
                  (parseFloat(this.selectValues[i].power) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
                sumProtein = (
                  parseFloat(sumProtein) +
                  (parseFloat(this.selectValues[i].protein) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
                sumLipid = (
                  parseFloat(sumLipid) +
                  (parseFloat(this.selectValues[i].lipid) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
                sumGlucid = (
                  parseFloat(sumGlucid) +
                  (parseFloat(this.selectValues[i].glucid) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
                sumCa = (
                  parseFloat(sumCa) +
                  (parseFloat(this.selectValues[i].ca) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
                sumFe = (
                  parseFloat(sumFe) +
                  (parseFloat(this.selectValues[i].fe) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
                sumFiber = (
                  parseFloat(sumFiber) +
                  (parseFloat(this.selectValues[i].fiber) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
                sumZn = (
                  parseFloat(sumZn) +
                  (parseFloat(this.selectValues[i].zn) *
                    parseFloat(newVal[i])) /
                    100
                ).toFixed(2)
              }
            }
            this.form.power = sumPower.toString()
            this.form.protein = sumProtein.toString()
            this.form.lipid = sumLipid.toString()
            this.form.glucid = sumGlucid.toString()
            this.form.ca = sumCa.toString()
            this.form.fe = sumFe.toString()
            this.form.fiber = sumFiber.toString()
            this.form.zn = sumZn.toString()
          }

          this.form.foods = this.selectValues.map((item) => item._id)
          this.form.values = this.inputValues
        }
      },
    },
  },

  mounted() {
    if (this.$auth.user.role === PARENTS) {
      this.$auth.user.child.forEach((student) => {
        this.studentOption.push({
          value: student._id,
          text: student.fullName,
        })
      })
    }

    if (this.$auth.user.role === STUDENT) {
      this.selectedStudent = this.$auth.user
    }
  },

  methods: {
    dateToString,
    convertStringToTimeStamps,
    LAUNCH() {
      return LAUNCH
    },
    show(item) {
      if (item) {
        this.isEdit = true
        this.form = cloneDeep(item)
        this.selectValues = this.form.foods
        // value as amount (gam)
        this.inputValues = this.form.values
      }

      if (item.date && item.power === '0') {
        this.isEdit = false
        this.selectValues = []
        this.inputValues = []
        this.form = cloneDeep(item)
      }

      this.$nextTick(() => {
        this.$refs.modal.show()
      })
    },
    handleModalHidden(bvModalEvt) {
      this.form = cloneDeep(defaultForm)
      this.selectValues = []
      this.inputValues = []
      this.isEdit = false
      this.error = null
    },
    processFormToSubmit() {
      const form = cloneDeep(this.form)
      return form
    },
    async addItem() {
      try {
        const form = this.processFormToSubmit()
        form.date = convertStringToTimeStamps(form.date)
        this.vForm = new Form(form)

        await this.vForm.post(this.$axios.defaults.baseURL + '/meals')
        this.$notifySuccess(this.notifyTitle, 'Thêm bữa ăn thành công!')
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
    async updateItem() {
      try {
        const form = this.processFormToSubmit()
        form.date = convertStringToTimeStamps(form.date)
        this.vForm = new Form(form)

        await this.vForm.patch(
          this.$axios.defaults.baseURL + '/meals/' + this.form._id
        )
        this.$notifySuccess(this.notifyTitle, 'Cập nhật bữa ăn thành công!')
        this.$refs.modal.hide()

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
    onSelectChange(index) {
      this.canAddSelect = this.selectValues[index] !== ''
    },
    removeSelect(index) {
      this.selectValues.splice(index, 1)
      this.inputValues.splice(index, 1)
    },
    addSelect() {
      this.selectValues.push('')
      this.inputValues.push('0.0')
      this.canAddSelect = true
    },
  },
}
</script>
