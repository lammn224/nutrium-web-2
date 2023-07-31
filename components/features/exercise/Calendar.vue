<template>
  <div class="">
    <b-overlay
      :show="isLoading"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <div class="panel panel-default">
        <div class="panel-heading rounded"><h2>Luyện tập</h2></div>

        <div class="panel-body">
          <div class="row">
            <div class="col-sm-12">
              <exercise-header
                :current-month="currentMonth"
                :first-day="firstDay"
              ></exercise-header>

              <div class="full-calendar-body">
                <div class="weeks">
                  <strong
                    v-for="(dayIndex, idx) in 7"
                    :key="idx"
                    class="week"
                    >{{
                      (dayIndex - 1) | weekDayName(firstDay, appLocale)
                    }}</strong
                  >
                </div>

                <div ref="dates" class="dates">
                  <exercise-week
                    v-for="(week, index) in Weeks"
                    :key="index"
                    :first-day="firstDay"
                    :week="week"
                  >
                  </exercise-week>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { CHANGE_MONTH } from '~/constants/calendar-actions.constant'

export default {
  name: 'ExerciseCalendar',
  filters: {
    weekDayName(weekday, firstDay, locale) {
      firstDay = parseInt(firstDay)
      const localMoment = moment().locale(locale)
      return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7]
    },
  },
  props: {
    firstDay: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String,
      validator(val) {
        const res = parseInt(val)
        return res >= 0 && res <= 6
      },
      default: 0,
    },
  },
  data() {
    return {
      scheduledExercises: [],
      isLoading: false,
      error: null,
      currentMonth: moment().startOf('month'),
      appLocale: 'vi',
      startMonth: moment().startOf('month').unix(),
      endMonth: moment().endOf('month').unix(),
    }
  },
  computed: {
    Weeks() {
      const monthMomentObject = this.getMonthViewStartDate(
        this.currentMonth,
        this.firstDay
      )
      const weeks = []
      let week = []

      const daysInCurrentMonth = this.currentMonth.daysInMonth()

      for (let weekIndex = 0; weekIndex < 5; weekIndex++) {
        week = []
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          week.push(this.getDayObject(monthMomentObject, dayIndex))

          monthMomentObject.add(1, 'day')
        }

        weeks.push(week)
      }

      const diff = daysInCurrentMonth - weeks[4][6].date.format('D')

      if (diff > 0 && diff < 3) {
        week = []
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          week.push(this.getDayObject(monthMomentObject, dayIndex))

          monthMomentObject.add(1, 'day')
        }

        weeks.push(week)
      }

      return weeks
    },
  },
  created() {
    const me = this
    this.$root.$on(CHANGE_MONTH, async (payload) => {
      me.currentMonth = payload
      this.startMonth = moment(payload).startOf('month').unix()
      this.endMonth = moment(payload).endOf('month').unix()
      await this.loadScheduledExercise()
      await this.loadActivityData()
    })
    this.$bus.$on('reloadScheduleExerciseData', async () => {
      await this.loadScheduledExercise()
      await this.loadActivityData()
    })
  },
  async mounted() {
    this.delay = (ms) =>
      new Promise((resolve, reject) => setTimeout(resolve, ms))

    await this.loadScheduledExercise()
    await this.loadActivityData()
  },
  methods: {
    ...mapActions({
      setActivities: 'activity/setActivities',
    }),

    async loadScheduledExercise() {
      const params = `startMonth=${this.startMonth}&endMonth=${this.endMonth}`
      this.isLoading = true
      await this.delay(500)

      try {
        const { data } = await this.$axios.get(`/schedule-exercise?${params}`)
        data.forEach((ex) => {
          ex.date = new Date(ex.date * 1000)
        })

        this.scheduledExercises = data
      } catch (e) {
        this.scheduledExercises = []
      } finally {
        this.isLoading = false
      }
    },

    async loadActivityData() {
      this.isLoading = true
      await this.delay(500)

      try {
        const { data } = await this.$axios.get('/activities/all')

        await this.setActivities(data)
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    getExercises(date) {
      return this.scheduledExercises.filter((exercise) => {
        return date.isSame(exercise.date, 'day') ? exercise : null
      })
    },

    getMonthViewStartDate(date, firstDay) {
      firstDay = parseInt(firstDay)

      const start = moment(date).locale('vi')
      const startOfMonth = moment(start.startOf('month'))

      start.subtract(startOfMonth.day(), 'days')

      if (startOfMonth.day() < firstDay) {
        start.subtract(7, 'days')
      }

      start.add(firstDay, 'days')

      return start
    },

    getDayObject(monthMomentObject, dayIndex) {
      const data = {
        isToday: monthMomentObject.isSame(moment(), 'day'),
        isCurrentMonth: monthMomentObject.isSame(this.currentMonth, 'month'),
        weekDay: dayIndex,
        isWeekEnd: dayIndex === 5 || dayIndex === 6,
        date: moment(monthMomentObject),
        exercises: this.getExercises(monthMomentObject),
      }

      return data
    },
  },
}
</script>

<style scoped>
.panel-default > .panel-heading {
  padding: 10px 15px;
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding-top: 15px;
}

ul,
p {
  margin: 0;
  padding: 0;
}

.full-calendar-body {
  margin-top: 20px;
}

.weeks {
  display: flex;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
}

.week {
  flex: 1;
  padding: 5px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
}

.dates {
  position: relative;
}
</style>
