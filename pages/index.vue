<template>
  <div>
    <div class="d-flex mb-5">
      <meal-statistic
        v-if="$auth.user.role === ADMIN()"
        :student="null"
        :class-name="'col-lg-12'"
      ></meal-statistic>

      <meal-statistic
        v-for="(child, idx) in $auth.user.child"
        v-else
        :key="idx"
        :student="child"
        :class-name="$auth.user.child.length === 1 ? 'col-lg-6' : 'col-lg-6'"
      ></meal-statistic>
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
