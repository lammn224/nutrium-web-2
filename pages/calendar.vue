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
import { mapActions } from 'vuex'

export default {
  name: 'CalendarPage',
  data() {
    return {
      meals: [],
    }
  },

  head() {
    return {
      title: 'Calendar',
    }
  },

  async mounted() {
    await this.loadMeals()
    await this.loadFoodData()
    this.$bus.$on('reloadMealData', async () => {
      await this.loadMeals()
    })
  },

  methods: {
    ...mapActions({
      setFoods: 'food/setFoods',
    }),

    async loadMeals() {
      try {
        const { data } = await this.$axios.get('meals/all')
        data.forEach((meal) => {
          meal.date = new Date(meal.date * 1000)
        })

        this.meals = data
      } catch (e) {}
    },

    async loadFoodData() {
      try {
        const { data } = await this.$axios.get('/foods/all')

        await this.setFoods(data)
      } catch (e) {}
    },
  },
}
</script>
