<template>
  <div
    class="panel no-margin bg-"
    :class="[
      meal.type === LAUNCH()
        ? 'bg-secondary'
        : meal.type === BREAKFAST()
        ? 'bg-primary'
        : 'bg-warning',
    ]"
  >
    <div
      v-if="meal.type !== LAUNCH()"
      class="panel-heading event-title"
      :class="{ 'clickable-event': isDaySelected }"
    >
      {{ MEALS.get(meal.type) }} -
      {{
        meal.student.fullName.split(' ')[
          meal.student.fullName.split(' ').length - 1
        ]
      }}
    </div>
    <div
      v-else
      class="panel-heading event-title"
      :class="{ 'clickable-event': isDaySelected }"
    >
      {{ MEALS.get(meal.type) }}
    </div>
  </div>
</template>

<script>
import { BREAKFAST, LAUNCH, MEALS } from '~/constants/meal-type.constant'

export default {
  name: 'EventCard',
  props: {
    meal: {
      type: Object,
      default: null,
    },
    isDaySelected: {
      type: Boolean,
    },
  },
  computed: {
    MEALS() {
      return MEALS
    },
  },
  methods: {
    BREAKFAST() {
      return BREAKFAST
    },
    LAUNCH() {
      return LAUNCH
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
