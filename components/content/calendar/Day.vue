<template>
  <div
    class="day-cell"
    :class="{
      today: day.isToday,
      'current-month': day.isCurrentMonth,
      weekend: day.isWeekEnd,
      'selected-day': isDaySelected,
    }"
    @click="showDayOptions"
  >
    <div class="row">
      <div class="col-sm-6">
        <div v-show="isDaySelected">
          <span class="label-cus bg-primary" @click="showAddMealForm">
            Add meal</span
          >
        </div>
      </div>
      <div class="col-sm-6">
        <p class="day-number">{{ day.date.format('D') }}</p>
      </div>
    </div>
    <div class="event-box">
      <content-calendar-event-card
        v-for="meal in day.meals"
        :key="meal.id"
        :meal="meal"
        :day-date="day.date"
        :is-day-selected="isDaySelected"
        @click.native="showDetailMeal(meal)"
      >
      </content-calendar-event-card>
      <meal-modal ref="modal" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import {
  CHANGE_MONTH,
  DAY_SELECTED,
} from '~/constants/calendar-actions.constant'
import { dateToString } from '~/services/convertTimeStamps.service'

const defaultForm = {
  type: '',
  date: '',
  power: '0',
  protein: '0',
  lipid: '0',
  glucid: '0',
  foods: [],
}
export default {
  name: 'DayCalendar',
  props: {
    day: {
      type: Object,
      default: null,
    },
    firstDay: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isDaySelected: false,
      thisDayStr: dateToString(this.day.date._d),
    }
  },

  created() {
    const me = this
    this.$root.$on(DAY_SELECTED, function (payload) {
      if (payload.dayDate !== me.day.date) {
        me.isDaySelected = false
      }
    })

    this.$root.$on(CHANGE_MONTH, function () {
      me.isDaySelected = false
    })
  },
  methods: {
    showDayOptions() {
      // const me = this
      const startOfToday = moment().startOf('day')
      if (
        this.day.date.isAfter(startOfToday) ||
        this.day.date.isSame(startOfToday)
      ) {
        this.isDaySelected = true
        this.$root.$emit(DAY_SELECTED, { dayDate: this.day.date })
      }
    },
    showAddMealForm() {
      if (this.day.meals.length < 3) {
        defaultForm.date = this.thisDayStr
        defaultForm.school = this.$auth.user.school._id
        defaultForm.createdBy = this.$auth.user._id

        this.$refs.modal.show(defaultForm)
      } else {
        this.$notifyEnoughMeal(this.thisDayStr)
      }
    },

    showDetailMeal(meal) {
      const cloneMeal = cloneDeep(defaultForm)
      cloneMeal.date = this.thisDayStr
      cloneMeal.school = meal.school
      cloneMeal.power = meal.power
      cloneMeal.protein = meal.protein
      cloneMeal.lipid = meal.lipid
      cloneMeal.foods = meal.foods
      cloneMeal.type = meal.type
      cloneMeal._id = meal._id
      cloneMeal.createdBy = meal.createdBy

      this.$refs.modal.show(cloneMeal)
    },
  },
}
</script>

<style>
.label-cus {
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
}

.day-cell {
  flex: 1;
  min-height: 112px;
  padding: 4px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  background: rgba(147 147 147 / 10%);
}

.day-number {
  text-align: right;
  color: rgba(0 0 0 / 25%);
  font-size: 1em;
  padding: 5px;
}

.current-month {
  background: #fff;
}

.current-month p {
  color: rgba(0 0 0 / 50%);
  font-size: 1.5em;
}

.selected-day p {
  font-size: 2.4em;
  font-weight: bolder;
}

.weekend p {
  color: rgba(210 2 2 / 60%);
}

.today {
  background-color: #e8fde7;
}

.today p {
  font-size: 2em;
  font-weight: bolder;
  color: #367016;
}
</style>
