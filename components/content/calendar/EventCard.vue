<template>
  <div class="panel no-margin" :class="[event.color]" @click="showEventDetails">
    <div
      class="panel-heading event-title"
      :class="{ 'clickable-event': isDaySelected }"
    >
      {{ event.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      default: null,
    },
    isDaySelected: {
      type: Boolean,
    },
  },
  methods: {
    showEventDetails() {
      if (this.isDaySelected) {
        // TODO: implement event details presentation
        // Show modal detail about meals
        console.log(this.event)
        alert(
          this.event.title + ' is selected. Can you help implement this too?'
        )
      }
    },
  },
}
</script>

<style>
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}

.event-title {
  padding: 0 5px;
  font-size: 12px;
}

.clickable-event {
  text-decoration: underline;
}
</style>
