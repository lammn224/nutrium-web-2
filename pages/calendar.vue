<template>
  <div id="app">
    <content-calendar
      class="bg-"
      :first-day="1"
      :all-meals="meals"
    ></content-calendar>
  </div>
</template>

<script>
export default {
  name: 'CalendarPage',
  data() {
    return {
      meals: [],
    }
  },
  async mounted() {
    await this.loadMeals()
    this.$bus.$on('reloadMealData', async () => {
      await this.loadMeals()
    })
  },

  methods: {
    async loadMeals() {
      const { data } = await this.$axios.get('meals/all')
      data.forEach((meal) => {
        meal.date = new Date(meal.date * 1000)
      })

      this.meals = data
    },
  },
}
</script>
