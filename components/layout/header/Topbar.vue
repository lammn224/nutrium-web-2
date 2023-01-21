<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
    <!--begin: Search -->
    <KTSearchDefault></KTSearchDefault>

    <!--begin: Quick panel toggle -->
    <KTQuickPanel></KTQuickPanel>
    <!--end: Quick panel toggle -->

    <!--begin: Quick panel toggle -->
    <KTQuickActions></KTQuickActions>
    <!--end: Quick panel toggle -->

    <!--begin: User Bar -->
    <KTQuickUser></KTQuickUser>
    <!--end: User Bar -->

    <KTQuickNotifications></KTQuickNotifications>
  </div>
  <!-- end:: Header Topbar -->
</template>

<script>
export default {
  name: 'KTTopbar',
  data() {
    return {}
  },
  computed: {
    getLanguageFlag() {
      return this.onLanguageChanged()
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.topbar {
  .dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>
