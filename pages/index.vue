<template>
  <div>
    <div class="mb-5">
      <meal-statistic
        v-if="$auth.user.role === ADMIN()"
        :student="null"
        :class-name="'col-lg-12'"
      ></meal-statistic>

      <div
        v-for="(child, idx) in $auth.user.child"
        v-else-if="$auth.user.child"
        :key="idx"
        class="d-flex flex-row-fluid mb-5"
      >
        <student-info-card :student="child"></student-info-card>
        <div class="w-100">
          <meal-statistic
            :student="child"
            :class-name="$auth.user.child?.length === 1 ? 'ml-lg-8' : 'ml-lg-8'"
          />
          <schedule-exercise-statistic
            :student="child"
            :class-name="'ml-lg-8'"
          />
        </div>
      </div>

      <div v-else class="d-flex flex-row-fluid mb-5">
        <student-info-card :student="$auth.user"></student-info-card>
        <div class="w-100">
          <meal-statistic
            :student="$auth.user"
            :class-name="'ml-lg-8'"
          ></meal-statistic>
          <schedule-exercise-statistic
            :student="$auth.user"
            :class-name="'ml-lg-8'"
          />
        </div>
      </div>
    </div>

    <div class="d-flex">
      <student-body-index-by-class
        v-if="$auth.user.role === ADMIN()"
      ></student-body-index-by-class>

      <student-body-index-by-grade
        v-if="$auth.user.role === ADMIN()"
      ></student-body-index-by-grade>
    </div>
  </div>
</template>

<script>
import { ADMIN } from '~/constants/role.constant'

export default {
  name: 'IndexPage',
  data() {
    return {}
  },

  head() {
    return {
      title: 'Home',
    }
  },
  methods: {
    ADMIN() {
      return ADMIN
    },
  },
}
</script>
