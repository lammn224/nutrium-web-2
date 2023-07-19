import 'bootstrap-notify'
import $ from 'jquery'
import Vue from 'vue'

const notify = (title, message, type = 'danger', icon = null) => {
  let iconClass = ''

  if (icon == null) {
    switch (type) {
      case 'danger':
        iconClass = 'icon la la-exclamation-circle'
        break
      case 'success':
        iconClass = 'icon la la-check'
        break
      case 'info':
        iconClass = 'icon la la-info-circle'
        break
      case 'warning':
        iconClass = 'icon la la-exclamation-triangle'
        break
      default:
        break
    }
  } else {
    iconClass = 'icon ' + icon
  }

  $.notify(
    {
      title,
      message,
      icon: iconClass,
    },
    {
      type,
      z_index: 99999,
      timer: 2500,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutDown',
      },
      template:
        '<div data-notify="container" class="alert alert-{0}" role="alert" style="font-size: 15px">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss"></button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>',
    }
  )
}

Vue.prototype.$notify = notify
Vue.prototype.$notifyTryAgain = (title, msg) =>
  notify(title, `${msg}`, 'danger')

Vue.prototype.$notifySuccess = (title, msg) =>
  notify(title, `${msg}`, 'success')

Vue.prototype.$notifyNoPermission = (title, msg) =>
  notify(title, `${msg}`, 'danger')

Vue.prototype.$notifyUpdateInfoSuccess = (title, msg) =>
  notify(title, `${msg}`, 'success')
