<script>
import { Form } from 'vform'
import cloneDeep from 'lodash/cloneDeep'
import { ERROR_CODES } from '~/constants/error-code.constants'

export default {
  name: 'BaseFormModal',
  props: {
    onActionSuccess: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isEdit: false,
      vForm: new Form(),
    }
  },
  methods: {
    show(item) {
      if (item) {
        this.isEdit = true
        this.form = cloneDeep(item)
      }

      this.$nextTick(() => {
        this.$refs.modal.show()
      })
    },
    hide() {
      this.$refs.modal.hide()
    },
    async handleModalOk(bvModalEvt) {
      bvModalEvt.preventDefault()

      await this.validateForm()
    },
    async validateForm() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        if (this.isEdit) {
          await this.updateItem()
        } else {
          await this.addItem()
        }
      }
    },
    processError(e) {
      if (e.response) {
        if (e.response.status === 422) {
          this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
        } else if (e.response.status === 500) {
          this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
        } else {
          this.$notifyTryAgain(
            this.notifyTitle,
            ERROR_CODES.get(e.response.data.code)
          )
        }
      } else {
        this.$notifyTryAgain(this.notifyTitle, this.tryAgainMsg)
      }
    },
  },
}
</script>
