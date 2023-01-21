'use strict'

const KTLayoutSubheader = (function () {
  // Private properties
  let _element

  // Private functions
  const _getHeight = function () {
    let height = 0

    if (_element) {
      height = KTUtil.actualHeight(_element)
    }

    return height
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id)

      if (!_element) {
      }
    },

    isFixed: function () {
      return KTUtil.hasClass(KTUtil.getBody(), 'subheader-fixed')
    },

    getElement: function () {
      return _element
    },

    getHeight: function () {
      return _getHeight()
    },
  }
})()

export default KTLayoutSubheader
