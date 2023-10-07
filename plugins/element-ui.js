import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'assets/sass/components/element-ui-custom.scss'

locale.use(lang)

export default () => {
  Vue.component('ElDatePicker', () =>
    import(
      /* webpackChunkName: 'element-ui-date-picker' */ 'element-ui/lib/date-picker'
    )
  )

  Vue.component('ElSelect', () =>
    import(/* webpackChunkName: 'element-ui-select' */ 'element-ui/lib/select')
  )

  Vue.component('ElOptionGroup', () =>
    import(
      /* webpackChunkName: 'element-ui-option-group' */ 'element-ui/lib/option-group'
    )
  )

  Vue.component('ElOption', () =>
    import(/* webpackChunkName: 'element-ui-option' */ 'element-ui/lib/option')
  )
}
