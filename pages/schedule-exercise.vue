<template>
  <div id="app">
    <exercise-calendar
      class="bg-"
      :first-day="1"
      :all-exercises="scheduledExercises"
    ></exercise-calendar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ScheduleExercise',

  data() {
    return {
      scheduledExercises: [],
    }
  },

  head() {
    return {
      title: 'Schedule Exercise',
    }
  },

  async mounted() {
    await this.loadScheduledExercise()
    await this.loadActivityData()
    this.$bus.$on('reloadScheduleExerciseData', async () => {
      await this.loadScheduledExercise()
    })
  },

  methods: {
    ...mapActions({
      setActivities: 'activity/setActivities',
    }),

    async loadScheduledExercise() {
      try {
        const { data } = await this.$axios.get('/schedule-exercise')
        data.forEach((ex) => {
          ex.date = new Date(ex.date * 1000)
        })

        this.scheduledExercises = data
      } catch (e) {}
    },

    async loadActivityData() {
      try {
        const { data } = await this.$axios.get('/activities/all')

        await this.setActivities(data)
      } catch (e) {}
    },
  },
}
</script>
