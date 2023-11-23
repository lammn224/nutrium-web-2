<template>
  <div>active code, please</div>
</template>

<script>
export default {
  name: 'ActiveCode',
  layout: 'blank',
  props: {
    error: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    backgroundImage() {
      return require('~/assets/media/error/bg4.jpg')
    },
  },
}
</script>

<style lang="scss">
@import '~assets/sass/pages/error/error-4.scss';
</style>
