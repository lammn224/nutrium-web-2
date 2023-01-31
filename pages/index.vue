<template>
  <div>
    <div class="d-flex">
      <div class="flex-row-auto offcanvas-mobile w-300px w-xl-350px h-100">
        <div class="card card-custom card-stretch">
          <b-m-i-calculator></b-m-i-calculator>
        </div>
      </div>

      <div class="flex-row-fluid ml-lg-8">
        <div class="card card-custom">
          <div class="card-body"><Tutorial />hallo</div>
          <div class="card-body"><Tutorial />hallo</div>
          <div class="card-body"><Tutorial />hallo</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
