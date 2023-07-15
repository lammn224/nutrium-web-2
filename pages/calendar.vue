<template>
  <div id="app">
    <content-calendar class="bg-" :first-day="1" />
  </div>
</template>

<script>
export default {
  name: 'CalendarPage',
  data() {
    return {}
  },

  head() {
    return {
      title: 'Calendar',
    }
  },
}
</script>
