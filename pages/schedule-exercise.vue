<template>
  <div id="app">
    <exercise-calendar class="bg-" :first-day="1"></exercise-calendar>
  </div>
</template>

<script>
export default {
  name: 'ScheduleExercise',

  data() {
    return {}
  },

  head() {
    return {
      title: 'Schedule Exercise',
    }
  },
}
</script>
