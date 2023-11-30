<template>
  <div class="row align-items-center">
    <div class="col-xl-5 col-12">
      <div class="btn-group w-100">
        <button
          class="btn btn-outline btn-primary"
          form=""
          @click.stop="goPrev"
        >
          <i class="flaticon2-back"></i> Tháng trước
        </button>
        <button
          class="btn btn-outline btn-primary today-button"
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
    <div
      :class="$auth.user.role === ADMIN() ? 'col-6' : 'col-12'"
      class="col-xl-3 mt-xl-0 mt-4"
    >
      <div class="title">{{ title }}</div>
    </div>
    <div v-if="$auth.user.role === ADMIN()" class="col-xl-4 col-6 mt-xl-0 mt-4">
      <b-button
        class="float-right"
        variant="primary"
        @click="showCloneMealsModal"
        >Sao chép bữa ăn tuần trước
      </b-button>
    </div>
    <meal-clone-meal-modal v-if="$auth.user.role === ADMIN()" ref="modal" />
  </div>
</template>

<script>
import moment from 'moment'
import { CHANGE_MONTH } from '~/constants/calendar-actions.constant'
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'HeaderCalendar',
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
      this.$root.$emit(CHANGE_MONTH, moment().startOf('month'))
    },

    showCloneMealsModal() {
      this.$refs.modal.show()
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
