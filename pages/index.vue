<template>
  <div>
    <div class="d-flex mb-5">
      <!--      <div class="flex-row-auto offcanvas-mobile col-lg-6">-->
      <!--        <div class="card card-custom">-->
      <!--          <b-m-i-calculator></b-m-i-calculator>-->
      <!--        </div>-->
      <!--      </div>-->

      <student-body-index-by-grade
        v-if="$auth.user.role === ADMIN()"
      ></student-body-index-by-grade>

      <meal-statistic></meal-statistic>
    </div>
    <div class="d-flex">
      <student-body-index-by-class
        v-if="$auth.user.role === ADMIN()"
      ></student-body-index-by-class>
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
