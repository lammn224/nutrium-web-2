<template>
  <div class="row">
    <div class="col-sm-4">
      <div class="btn-group">
        <button
          class="btn btn-outline btn-primary"
          form=""
          @click.stop="goPrev"
        >
          <i class="flaticon2-back"></i> Tháng trước
        </button>
        <button
          class="btn btn-outline btn-default today-button"
          form=""
          @click.stop="goToday"
        >
          <i class="flaticon2-down"></i> Hiện tại
        </button>
        <button
          class="btn btn-outline btn-primary"
          form=""
          @click.stop="goNext"
        >
          Tháng sau <i class="flaticon2-next"></i>
        </button>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { CHANGE_MONTH } from '~/constants/calendar-actions.constant'
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'ExerciseHeaderCalendar',
  props: {
    currentMonth: {
      type: Object,
      default: null,
    },
    locale: {
      type: String,
      default: 'vi',
    },
  },
  data() {
    return {
      localeSelect: 'vi',
    }
  },
  computed: {
    title() {
      if (!this.currentMonth) return
      return this.currentMonth.locale(this.locale).format('MMM YYYY')
    },
  },
  methods: {
    ADMIN() {
      return ADMIN
    },
    goPrev() {
      const payload = moment(this.currentMonth)
        .subtract(1, 'months')
        .startOf('month')
      this.$root.$emit(CHANGE_MONTH, payload)
    },
    goNext() {
      const payload = moment(this.currentMonth)
        .add(1, 'months')
        .startOf('month')
      this.$root.$emit(CHANGE_MONTH, payload)
    },
    goToday() {
      this.$root.$emit(CHANGE_MONTH, moment())
    },
  },
}
</script>

<style>
.full-calendar-header {
  display: flex;
  align-items: center;
}

.header-center {
  flex: 3;
  text-align: center;
}

.title {
  text-align: center;
  font-size: 1.5em;
  font-weight: bolder;
}

.language-select {
  display: inline-block;
  width: 50%;
}
</style>
