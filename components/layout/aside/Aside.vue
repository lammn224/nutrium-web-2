<template>
  <!-- begin:: Aside -->
  <div
    id="kt_aside"
    ref="kt_aside"
    class="aside aside-left aside-fixed d-flex flex-column flex-row-auto"
  >
    <!-- begin:: Aside Menu -->
    <div
      id="kt_aside_menu_wrapper"
      class="aside-menu-wrapper flex-column-fluid"
    >
      <div
        id="kt_aside_menu"
        ref="kt_aside_menu"
        class="aside-menu min-h-lg-800px"
        data-menu-vertical="1"
        data-menu-dropdown-timeout="500"
        :class="asideMenuClass"
      >
        <!-- example static menu here -->
        <perfect-scrollbar
          class="aside-menu scroll"
          style="max-height: 90vh; position: relative"
        >
          <KTMenu></KTMenu>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
  <!-- end:: Aside -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'KTAside',
  components: {},
  data() {
    return {
      insideTm: 0,
      outsideTm: 0,
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   // Init Aside
    //   KTLayoutAside.init(this.$refs["kt_aside"]);
    //
    //   // Init Aside Menu
    //   KTLayoutAsideMenu.init(this.$refs["kt_aside_menu"]);
    // });
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters({
      layoutConfig: 'config.module/layoutConfig',
      getClasses: 'htmlclass.module/getClasses',
    }),

    /**
     * Get extra classes for menu based on the options
     */
    asideMenuClass() {
      const classes = this.getClasses('aside_menu')
      if (typeof classes !== 'undefined') {
        return classes.join(' ')
      }
      return null
    },
  },
}
</script>
