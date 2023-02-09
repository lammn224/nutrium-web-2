<template>
  <div class="week-row" @click="showWeekNumber">
    <div v-if="showWeekNumberFlag" class="week-number">
      Week {{ week[0].date.format('w') }}
    </div>
    <content-calendar-day
      v-for="(day, index) in week"
      :key="index"
      :day="day"
    ></content-calendar-day>
  </div>
</template>

<script>
import { WEEK_SELECTED } from '~/constants/calendar-actions.constant'

export default {
  name: 'WeekCalendar',
  props: {
    week: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showWeekNumberFlag: false,
    }
  },

  created() {
    const me = this
    this.$root.$on(WEEK_SELECTED, function (payload) {
      if (payload.weekDate !== me.week[0].date) {
        me.showWeekNumberFlag = false
      }
    })
  },
  methods: {
    showWeekNumber() {
      // const me = this
      this.showWeekNumberFlag = true
      this.$root.$emit(WEEK_SELECTED, { weekDate: this.week[0].date })
    },
  },
}
</script>

<style>
.week-row {
  width: 100%;
  border-left: 1px solid #e0e0e0;
  display: flex;
  cursor: pointer;
}

.week-number {
  border: 1px solid #e1e1e1;
  border-right: 0;
  border-radius: 5px 0 0 5px;
  background-color: #fafafa;
  text-align: right;
  position: absolute;
  width: 70px;
  left: -71px;
  padding: 8px 5px;
  cursor: pointer;
}
</style>
