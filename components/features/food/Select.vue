<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    :options="filteredFoods"
    placeholder="Chọn một món ăn..."
    id-field="_id"
    text-field="name"
    name="selection"
  />
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'

export default {
  name: 'FoodSelect',
  props: {
    filteredFoods: {
      type: Array,
      default: () => [],
    },
    error: {
      type: String,
      default: '',
    },
    value: {
      type: [Object, Array, String],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    // label: {
    //   type: String,
    //   default: 'Trạng thái',
    // },
    allowClear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selection: null,
    }
  },
  computed: {
    ...mapGetters({
      foods: 'food/foods',
    }),
  },
  watch: {
    selection(val) {
      this.$emit('input', val)
    },
    value(newVal, oldVal) {
      if (newVal) {
        if (!oldVal || (oldVal && newVal.id !== oldVal.id)) {
          this.selection = newVal
        }
      } else {
        this.selection = newVal
      }
    },
  },
  created() {
    if (this.value) {
      this.$nextTick(() => (this.selection = cloneDeep(this.value)))
    }
  },
}
</script>
