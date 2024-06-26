<template>
  <div class="d-flex flex-column flex-root">
    <!-- begin:: Header Mobile -->
    <header-mobile></header-mobile>
    <!-- end:: Header Mobile -->

    <ContentLoader v-if="loaderEnabled" :logo="loaderLogo"></ContentLoader>

    <div class="d-flex flex-row flex-column-fluid page">
      <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
        <!-- begin:: Header -->
        <MainHeader></MainHeader>
        <!-- end:: header -->

        <!-- begin:: Content -->
        <div
          id="kt_content"
          class="content d-flex flex-column flex-column-fluid"
        >
          <!-- begin:: Content Body -->
          <div class="d-flex flex-column-fluid">
            <div
              :class="{
                'container-fluid': contentFluid,
                container: !contentFluid,
              }"
            >
              <div class="d-lg-flex flex-row-fluid">
                <!-- begin:: Aside Left -->
                <MainAside
                  v-if="
                    (asideEnabled && $auth.user.role === 'sysadmin') ||
                    (asideEnabled &&
                      $auth.user.school?.status !== 'unconfirmed' &&
                      $auth.user.role !== 'sysadmin')
                  "
                ></MainAside>
                <!-- end:: Aside Left -->
                <div class="content-wrapper flex-row-fluid">
                  <transition name="fade-in-up">
                    <router-view />
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MainFooter></MainFooter>
      </div>
    </div>

    <!--    <StickyToolbar v-if="toolbarDisplay"></StickyToolbar>-->
    <ScrollTop></ScrollTop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HtmlClass from '~/services/htmlclass.service'
import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME,
} from '~/store/htmlclass.module.js'

export default {
  name: 'DefaultLayout',

  computed: {
    ...mapGetters({
      layoutConfig: 'config.module/layoutConfig',
      pageTitle: 'breadcrumbs.module/pageTitle',
      breadcrumbs: 'breadcrumbs.module/breadcrumbs',
    }),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig('loader.type'))
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid() {
      return this.layoutConfig('content.width') === 'fluid'
    },

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo() {
      return this.layoutConfig('loader.logo')
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig('aside.self.display')
    },

    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay() {
      // return !!this.layoutConfig("toolbar.display");
      return true
    },

    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay() {
      return !!this.layoutConfig('subheader.display')
    },
  },

  beforeMount() {
    const htmlClass = new HtmlClass(this.$store)
    htmlClass.init(this.layoutConfig())
    // show page loading
    this.$store.dispatch(
      `htmlclass.module/${ADD_BODY_CLASSNAME}`,
      'page-loading'
    )

    // initialize html element classes
    // htmlClass.init(this)
  },
  mounted() {
    // check if current user is authenticated
    // if (!this.isAuthenticated) {
    //   this.$router.push({ name: 'login' })
    // }

    // Simulate the delay page loading
    setTimeout(() => {
      // Remove page loader after some time
      this.$store.dispatch(
        `htmlclass.module/${REMOVE_BODY_CLASSNAME}`,
        'page-loading'
      )
    }, 2000)
  },
  methods: {
    footerLayout(type) {
      return this.layoutConfig('footer.layout') === type
    },
  },
}
</script>
