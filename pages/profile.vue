<template>
  <div>
    <user-personal-information></user-personal-information>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'

// const defaultForm = {
//   fullName: '',
//   is_public: true,
// }

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
  methods: {},
}
</script>
