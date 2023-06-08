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
        <div v-show="isDaySelected" v-if="$auth.user.role !== ADMIN()">
          <span class="label-cus bg-primary" @click="showAddExerciseForm">
            Add exercise</span
          >
        </div>
      </div>
      <div class="col-sm-6">
        <p class="day-number">{{ day.date.format('D') }}</p>
      </div>
    </div>
    <div class="event-box">
      <exercise-event-card
        v-for="exercise in day.exercises"
        :key="exercise.id"
        :meal="exercise"
        :day-date="day.date"
        :is-day-selected="isDaySelected"
        @click.native="showDetailExercise(exercise)"
      >
      </exercise-event-card>
      <exercise-modal ref="modal" :moment-day="day" />
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
import { ADMIN } from '~/constants/role.constant'
import { dateToString } from '~/services/convertTimeStamps.service'

const defaultForm = {
  activity: null,
  timeDur: 0,
  student: null,
  calo: '0',
}
export default {
  name: 'ExerciseDayCalendar',
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
    ADMIN() {
      return ADMIN
    },
    showDayOptions() {
      const startOfToday = moment().startOf('day')
      if (
        // this.day.date.isBefore(startOfToday) ||
        this.day.date.isAfter(startOfToday) ||
        this.day.date.isSame(startOfToday)
      ) {
        this.isDaySelected = true
        this.$root.$emit(DAY_SELECTED, { dayDate: this.day.date })
      }

      if (this.$auth.user.role === ADMIN) {
        if (this.day.date.weekday() === 6 || this.day.date.weekday() === 5) {
          this.isDaySelected = false
        }
      }
    },
    showAddExerciseForm() {
      defaultForm.date = dateToString(this.day.date._d)
      defaultForm.school = this.$auth.user.school._id

      this.$refs.modal.show(defaultForm)
    },

    showDetailExercise(exercise) {
      const cloneExercise = cloneDeep(defaultForm)
      cloneExercise.date = dateToString(this.day.date._d)
      cloneExercise.school = exercise.school
      cloneExercise.activity = exercise.activity
      cloneExercise.calo = exercise.calo
      cloneExercise.timeDur = exercise.timeDur
      cloneExercise._id = exercise._id
      cloneExercise.isCreatedByAdmin = exercise.isCreatedByAdmin
      if (!exercise.isCreatedByAdmin) {
        cloneExercise.student = exercise.student._id
      }
      cloneExercise.createdBy = exercise.createdBy

      this.$refs.modal.show(cloneExercise)
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
