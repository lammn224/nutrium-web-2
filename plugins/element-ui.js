import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'

locale.use(lang)

export default () => {
  Vue.component('ElDatePicker', () =>
    import(
      /* webpackChunkName: 'element-ui-date-picker' */ 'element-ui/lib/date-picker'
    )
  )
}

// import Vue from 'vue'
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'
// import 'element-ui/lib/theme-chalk/index.css'
//
// import {
//   Select,
//   Button,
//   DatePicker
//   // ...
// } from 'element-ui'
//
// locale.use(lang)
//
// Vue.component(Select.name, Select)
// Vue.component(Button.name, Button)
// Vue.component(DatePicker.name, DatePicker)
