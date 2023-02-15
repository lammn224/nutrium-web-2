<template>
  <div>
    <student-detail v-if="student" :student="student"></student-detail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StudentDetailPage',
  data() {
    return {
      student: null,
    }
  },

  async fetch() {
    await this.detailsStudent()
  },

  head() {
    return {
      title: 'Student',
    }
  },

  computed: {
    ...mapGetters({
      school: 'school/school',
    }),
  },

  methods: {
    async detailsStudent() {
      const params = this.$route.params
      const { data } = await this.$axios.get(`students/${params.slug}`)
      this.student = data
    },
  },
}
</script>
