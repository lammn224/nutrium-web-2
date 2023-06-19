<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    placeholder="Chọn một hoạt động..."
    label="Hoạt động"
    data-vv-as="Hoạt động"
    id-field="_id"
    text-field="name"
    :options="activities"
    name="selection"
  />
</template>

<script>
import BaseFormSelectMixin from '~/components/base/form/SelectMixin.vue'
export default {
  name: 'ExerciseSelect',
  mixins: [BaseFormSelectMixin],
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
