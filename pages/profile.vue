<template>
  <div>
    <personal-information></personal-information>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'
import PersonalInformation from '~/components/features/user/PersonalInformation.vue'

// const defaultForm = {
//   fullName: '',
//   is_public: true,
// }

export default {
  name: 'ProfilePage',
  components: { PersonalInformation },
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
