<template>
  <div class="panel no-margin bg-secondary">
    <div
      class="panel-heading event-title"
      :class="{ 'clickable-event': isDaySelected }"
    >
      exercise -
      {{
        meal.student.fullName.split(' ')[
          meal.student.fullName.split(' ').length - 2
        ]
      }}
      {{
        meal.student.fullName.split(' ')[
          meal.student.fullName.split(' ').length - 1
        ]
      }}
    </div>
  </div>
</template>

<script>
import { BREAKFAST, LAUNCH, MEALS } from '~/constants/meal-type.constant'

export default {
  name: 'ExerciseEventCard',
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
