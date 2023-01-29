<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="error error-6 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
      }"
    >
      <!-- begin:: Content -->
      <div class="d-flex flex-column flex-row-fluid text-center">
        <h1
          class="error-title font-weight-boldest text-primary mb-12"
          style="margin-top: 12rem"
        >
          Oops...
        </h1>
        <p
          v-if="error.statusCode === 404"
          class="display-4 font-weight-bold text-primary"
        >
          Không tìm thấy trang bạn yêu cầu!
        </p>
        <p v-else class="display-4 font-weight-bold text-primary">
          Có vẻ như đã xảy ra sự cố.
          <br />Chúng tôi đang xử lý!
          <br />
        </p>
      </div>
      <!-- end:: Content -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'blank',
  props: {
    error: {
      type: Object,
      default: () => null,
    },
  },
  head() {
    return {
      title: 'Error',
    }
  },
  computed: {
    backgroundImage() {
      return require('~/assets/media/error/bg4.jpg')
    },
  },
  mounted() {},
}
</script>

<style lang="scss">
@import '~assets/sass/pages/error/error-4.scss';
</style>
