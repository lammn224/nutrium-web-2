<template>
  <b-modal
    ref="modal"
    :ok-title="isEdit ? 'Cập nhật' : 'Thêm mới'"
    :title="'Xem bữa ăn'"
    cancel-title="Hủy bỏ"
    no-enforce-focus
    size="lg"
    :hide-footer="true"
  >
    <validation-observer ref="observer">
      <base-form-text-input
        :value="MEALS.get(form.type)"
        required
        :error="vForm.errors.get('date')"
        placeholder="Loại bữa ăn"
        disabled
        label="Loại bữa ăn"
        rules="required|max:100"
        name="name"
        class="w-25"
      />

      <base-form-text-input
        :value="convertTimeStampsToString(form.date)"
        required
        :error="vForm.errors.get('date')"
        placeholder="Ngày"
        disabled
        label="Ngày"
        rules="required|max:100"
        name="name"
        class="w-25"
      />

      <div class="row">
        <div class="col-xl-3">
          <base-form-text-input
            :value="form.power"
            required
            disabled
            :error="vForm.errors.get('power')"
            placeholder="Năng lượng"
            label="Năng lượng"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
        </div>
        <div class="col-xl-3">
          <base-form-text-input
            :value="form.protein"
            required
            disabled
            :error="vForm.errors.get('protein')"
            placeholder="Protein"
            label="Protein"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
        </div>
        <div class="col-xl-3">
          <base-form-text-input
            :value="form.lipid"
            required
            disabled
            :error="vForm.errors.get('lipid')"
            placeholder="Lipid"
            label="Lipid"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
        </div>
        <div class="col-xl-3">
          <base-form-text-input
            :value="form.glucid"
            required
            disabled
            :error="vForm.errors.get('glucid')"
            placeholder="Glucid"
            label="Glucid"
            rules="required|max:100|regex:^[-+]?[0-9]*(\.[0-9]+)$"
            name="name"
          />
        </div>
      </div>
    </validation-observer>
    <ve-table
      :style="{ 'word-break': 'break-all' }"
      :columns="columns"
      :table-data="filteredList"
      :max-height="650"
      border-y
    />
  </b-modal>
</template>

<script>
import { VeTable } from 'vue-easytable'
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'
import BaseFormModal from '~/components/base/form/Modal'
import BaseFormMixin from '~/components/base/form/Mixin'
import { ADMIN, PARENTS } from '~/constants/role.constant'
import {
  BREAKFAST,
  DINNER,
  LAUNCH,
  MEALS,
} from '~/constants/meal-type.constant'
import { convertTimeStampsToString } from '~/services/convertTimeStamps.service'

const columns = [
  {
    field: 'name',
    key: 'a',
    title: 'Tên món ăn',
    align: 'left',
  },
  {
    field: 'power',
    key: 'b',
    title: 'Năng lượng',
    align: 'left',
  },
  {
    field: 'protein',
    key: 'c',
    title: 'Protein',
    align: 'left',
  },
  {
    field: 'lipid',
    key: 'd',
    title: 'Lipid',
    align: 'left',
  },
  {
    field: 'glucid',
    key: 'e',
    title: 'Glucid',
    align: 'left',
  },
  {
    field: 'ca',
    key: 'f',
    title: 'Canxi',
    align: 'left',
  },
  {
    field: 'fe',
    key: 'g',
    title: 'Sắt',
    align: 'left',
  },
  {
    field: 'zn',
    key: 'h',
    title: 'Kẽm',
    align: 'left',
  },
  {
    field: 'fiber',
    key: 'i',
    title: 'Chất xơ',
    align: 'left',
  },
]

const defaultForm = {
  type: MEALS.get(LAUNCH),
  date: '',
  power: '0',
  protein: '0',
  lipid: '0',
  glucid: '0',
  foods: [],
}
export default {
  name: 'MealModalSecond',
  components: {
    VeTable,
  },
  mixins: [BaseFormModal, BaseFormMixin],
  data() {
    return {
      columns,
      selected: null,
      options: [
        { value: BREAKFAST, text: MEALS.get(BREAKFAST) },
        { value: DINNER, text: MEALS.get(DINNER) },
        { value: LAUNCH, text: MEALS.get(LAUNCH) },
      ],
      form: cloneDeep(defaultForm),
    }
  },
  computed: {
    MEALS() {
      return MEALS
    },
    ...mapGetters({
      foods: 'food/foods',
    }),

    filteredList() {
      return this.foods.filter((item) => {
        return this.form.foods.includes(item._id)
      })
    },
  },

  methods: {
    convertTimeStampsToString,
    LAUNCH() {
      return LAUNCH
    },
    PARENTS() {
      return PARENTS
    },
    ADMIN() {
      return ADMIN
    },
    show(item) {
      if (item) {
        this.form = cloneDeep(item)
      }
      this.$nextTick(() => {
        this.$refs.modal.show()
      })
    },
  },
}
</script>
