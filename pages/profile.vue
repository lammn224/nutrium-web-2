<template>
  <div>
    <user-personal-information
      v-if="$auth.user.role !== STUDENT()"
    ></user-personal-information>
    <user-student-personal-information
      v-else
    ></user-student-personal-information>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'
import { STUDENT } from '~/constants/role.constant'

export default {
  name: 'ProfilePage',
  data() {
    return {
      form: cloneDeep(this.$auth.user),
      disable: true,
    }
  },
  head() {
    return {
      title: 'Profile',
    }
  },
  computed: {
    ...mapGetters({
      school: 'school/school',
    }),
  },
  methods: {
    STUDENT() {
      return STUDENT
    },
  },
}
</script>
