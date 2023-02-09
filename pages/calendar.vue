<template>
  <div id="app">
    <content-calendar :first-day="1" :all-events="events"></content-calendar>
  </div>
</template>

<script>
export default {
  name: 'CalendarPage',
  data() {
    return {
      events: [],
    }
  },
  mounted() {
    const me = this
    setTimeout(function () {
      me.events = [
        // you can make ajax call here
        // call api get meal
        {
          id: 1,
          title: 'Event 1',
          color: 'bg-danger',
          date: new Date(),
        },
        {
          id: 10,
          title: 'Event test array is full',
          color: 'bg-danger',
          date: new Date(),
        },
        {
          id: 2,
          title: 'Event blaa on same day!',
          color: 'bg-info',
          date: new Date(),
        },
        {
          id: 3,
          title: 'Event 2',
          color: 'bg-primary',
          date: new Date(new Date().setHours(new Date().getHours() + 2 * 24)), // add 2 days
        },
        {
          id: 4,
          title: 'Event 3',
          color: 'bg-success',
          date: new Date(new Date().setHours(new Date().getHours() + 5 * 24)), // add 5 days
        },
        {
          id: 5,
          title: 'Event 4',
          color: 'bg-warning',
          date: new Date(new Date().setHours(new Date().getHours() + 14 * 24)), // add 2 weeks
        },
        {
          id: 6,
          title: 'Event 5',
          color: 'bg-success',
          date: new Date(new Date().setHours(new Date().getHours() + 30 * 24)), // add 1 month
        },
      ]
    }, 1000)
  },
}
</script>
