<template>
  <ul class="menu-nav">
    <router-link
      v-slot="{ href, navigate, isActive, isExactActive }"
      to="/dashboard"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active',
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text"> Dashboard </span>
        </a>
      </li>
    </router-link>

    <router-link
      v-slot="{ href, navigate, isActive, isExactActive }"
      to="/builder"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active',
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text"> Builder </span>
        </a>
      </li>
    </router-link>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      :class="{ 'menu-item-active': hasActiveChildren('/vue-bootstrap') }"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Vue Bootstrap </span>
      </a>
      <div class="menu-submenu menu-submenu-fixed">
        <div class="menu-subnav megamenu" style="max-width: 1000px">
          <ul class="menu-content">
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Task Reports </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/alert"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Alert </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/badge"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Badge </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/button"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Button </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/button-group"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Button Group </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/button-toolbar"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Button Toolbar </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/card"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Card </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/carousel"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Carousel </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Profit Margins </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/collapse"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Collapse </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/dropdown"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Dropdown </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/embed"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Embed </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form-checkbox"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form Checkbox </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form-file"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form File </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form-group"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form Group </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form-input"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form Input </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Staff Management </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form-radio"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form Radio </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form-select"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form Select </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/form-textarea"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Form Textarea </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/image"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Image </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/input-group"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Input Group </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/jumbotron"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Jumbotron </span>
                    </a>
                  </li>
                </router-link>
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="layout-grid-system"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Layout Grid System </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Tools </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/link"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Link </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/list-group"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> List Group </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/media"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Media </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/modal"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Modal </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/nav"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Nav </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/navbar"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Navbar </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/pagination"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Pagination </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/pagination-nav"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Pagination Nav </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Misc </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/notify-popover"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Popover </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/progress"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Progress </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/progress-spinner"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Spinner </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/table"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Table </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/tabs"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Tabs </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/notify-toasts"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Toasts </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vue-bootstrap/notify-tooltip"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Tooltip </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      :class="{ 'menu-item-active': hasActiveChildren('vuetify') }"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Vuetify </span>
      </a>
      <div class="menu-submenu menu-submenu-fixed">
        <div class="menu-subnav megamenu" style="max-width: 800px">
          <ul class="menu-content">
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Task Reports </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/alerts"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Alerts </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/avatars"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Avatars </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/badges"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Badges </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/buttons"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Buttons </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/calendars"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Calendars </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Profit Margins </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/cards"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Cards </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/chips"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Chips </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/dialog"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Dialog </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/forms-autocompletes"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Autocompletes </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/forms-file-inputs"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> File Inputs </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Staff Management </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/forms"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Forms </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/forms-selection-controls"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Selection Controls </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/forms-selects"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Selects </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/forms-textareas"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Textareas </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/forms-text-fields"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Text Fields </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="menu-item">
              <h3 class="menu-heading menu-toggle">
                <i class="menu-bullet menu-bullet-dot"><span></span></i>
                <span class="menu-text"> Tools </span>
                <i class="menu-arrow"></i>
              </h3>
              <ul class="menu-inner">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/tables-simple-tables"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Simple Tables </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/tables-data-tables"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Data Tables </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/tabs"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Tabs </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/timelines"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Timelines </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/tooltips"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Tooltips </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/vuetify/treeview"
                >
                  <li
                    aria-haspopup="true"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Treeview </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open-dropdown"
      :class="{ 'menu-item-active': hasActiveChildren('/custom') }"
    >
      <a href="#" class="menu-link menu-toggle">
        <span class="menu-text"> Custom </span>
      </a>
      <div class="menu-submenu menu-submenu-classic">
        <ul class="menu-subnav">
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a href="#" class="menu-link menu-toggle">
              <i class="menu-icon flaticon2-list-2"></i>
              <span class="menu-text"> Error Pages </span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu menu-submenu-classic menu-submenu-right">
              <ul class="menu-subnav">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-error/error-1"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 1 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-error/error-2"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 2 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-error/error-3"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 3 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-error/error-4"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 4 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-error/error-5"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 5 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-error/error-6"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Error 6 </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </div>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
            :class="{
              'menu-item-active': hasActiveChildren('/custom-wizard/wizard'),
            }"
          >
            <a href="#" class="menu-link menu-toggle">
              <i class="menu-icon flaticon2-mail-1"></i>
              <span class="menu-text"> Wizard </span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu menu-submenu-classic menu-submenu-right">
              <ul class="menu-subnav">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-wizard/wizard-1"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 1 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-wizard/wizard-2"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 2 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-wizard/wizard-3"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 3 </span>
                    </a>
                  </li>
                </router-link>

                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-wizard/wizard-4"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Wizard 4 </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </div>
          </li>

          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
            :class="{
              'menu-item-active': hasActiveChildren('/custom-plugins'),
            }"
          >
            <a href="#" class="menu-link menu-toggle">
              <i class="menu-icon flaticon2-image-file"></i>
              <span class="menu-text"> Plugins </span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu menu-submenu-classic menu-submenu-right">
              <ul class="menu-subnav">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-plugins/cropper"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Cropper </span>
                    </a>
                  </li>
                </router-link>
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/custom-plugins/treeselect"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text"> Treeselect </span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </div>
          </li>

          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
            :class="{
              'menu-item-active': hasActiveChildren('/custom-pages'),
            }"
          >
            <a href="#" class="menu-link menu-toggle">
              <i class="menu-icon far fa-user"></i>
              <span class="menu-text">Profile</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu menu-submenu-classic menu-submenu-right">
              <ul class="menu-subnav">
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/profile/profile-1"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text">Profile 1</span>
                    </a>
                  </li>
                </router-link>
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/profile/profile-2"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text">Profile 2</span>
                    </a>
                  </li>
                </router-link>
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/profile/profile-3"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text">Profile 3</span>
                    </a>
                  </li>
                </router-link>
                <router-link
                  v-slot="{ href, navigate, isActive, isExactActive }"
                  to="/profile/profile-4"
                >
                  <li
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    class="menu-item"
                    :class="[
                      isActive && 'menu-item-active',
                      isExactActive && 'menu-item-active',
                    ]"
                  >
                    <a :href="href" class="menu-link" @click="navigate">
                      <i class="menu-bullet menu-bullet-dot"><span></span></i>
                      <span class="menu-text">Profile 4</span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'KTMenu',
  methods: {
    hasActiveChildren(match) {
      return this.$route.path.includes(match)
    },
  },
}
</script>
