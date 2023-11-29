<template>
  <div>
    <div v-if="$auth.user.role === SYSADMIN">Hello</div>
    <div v-else>
      <div class="mb-4">
        <meal-statistic
          v-if="$auth.user.role === ADMIN"
          :student="null"
        ></meal-statistic>

        <div v-else-if="$auth.user.child">
          <div v-for="(child, idx) in $auth.user.child" :key="idx">
            <div class="d-xl-flex d-block mb-5">
              <student-info-card
                :student="child"
                class="col-xxl-3 col-xl-4 col-12 mb-xl-0 mb-4 pl-0"
              />
              <div class="col-xxl-9 col-xl-8 col-12 pl-xl-2 pl-0">
                <student-statistic
                  :class-name="
                    $auth.user.child?.length === 1 ? 'ml-lg-8' : 'ml-lg-8'
                  "
                  :student="child"
                />
              </div>
            </div>
            <hr class="mb-12 d-block" />
          </div>
        </div>

        <div v-else class="d-xl-flex d-block mb-5">
          <student-info-card
            :student="$auth.user"
            class="col-xxl-3 col-xl-4 col-12 mb-xl-0 mb-4 pl-0"
          />
          <div class="col-xxl-9 col-xl-8 col-12 pl-xl-2 pl-0">
            <student-statistic :class-name="'ml-lg-8'" :student="$auth.user" />
          </div>
        </div>
      </div>

      <div class="d-lg-flex justify-content-lg-between d-block">
        <student-body-index-by-class
          v-if="$auth.user.role === ADMIN"
        ></student-body-index-by-class>

        <student-body-index-by-grade
          v-if="$auth.user.role === ADMIN"
        ></student-body-index-by-grade>
      </div>

      <!--      <div v-if="$auth.user.school?.status === 'unconfirmed'">-->
      <!--        <auth-active-code></auth-active-code>-->
      <!--      </div>-->
      <!--      <div v-else-if="$auth.user.school?.status === 'active'">-->
      <!--        <div class="mb-5">-->
      <!--          <meal-statistic-->
      <!--            v-if="$auth.user.role === ADMIN"-->
      <!--            :student="null"-->
      <!--            :class-name="'col-lg-12'"-->
      <!--          ></meal-statistic>-->

      <!--          <div v-else-if="$auth.user.child">-->
      <!--            <div v-for="(child, idx) in $auth.user.child" :key="idx">-->
      <!--              <div class="d-flex flex-row-fluid mb-5">-->
      <!--                <student-info-card :student="child"></student-info-card>-->
      <!--                <div class="w-100">-->
      <!--                  <meal-statistic-->
      <!--                    :student="child"-->
      <!--                    :class-name="-->
      <!--                  $auth.user.child?.length === 1 ? 'ml-lg-8' : 'ml-lg-8'-->
      <!--                "-->
      <!--                  />-->
      <!--                  <schedule-exercise-statistic-->
      <!--                    :student="child"-->
      <!--                    :class-name="'ml-lg-8'"-->
      <!--                  />-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <hr class="mb-12 d-block" />-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          <div v-else class="d-flex flex-row-fluid mb-5">-->
      <!--            <student-info-card :student="$auth.user"></student-info-card>-->
      <!--            <div class="w-100">-->
      <!--              <meal-statistic-->
      <!--                :student="$auth.user"-->
      <!--                :class-name="'ml-lg-8'"-->
      <!--              ></meal-statistic>-->
      <!--              <schedule-exercise-statistic-->
      <!--                :student="$auth.user"-->
      <!--                :class-name="'ml-lg-8'"-->
      <!--              />-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->

      <!--        <div class="d-flex">-->
      <!--          <student-body-index-by-class-->
      <!--            v-if="$auth.user.role === ADMIN"-->
      <!--          ></student-body-index-by-class>-->

      <!--          <student-body-index-by-grade-->
      <!--            v-if="$auth.user.role === ADMIN"-->
      <!--          ></student-body-index-by-grade>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { ADMIN, SYSADMIN } from '~/constants/role.constant'

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
  computed: {
    SYSADMIN() {
      return SYSADMIN
    },
    ADMIN() {
      return ADMIN
    },
  },
}
</script>
