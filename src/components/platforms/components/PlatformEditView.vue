<template>
  <div class="card-content">
    <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
    <app-platform-form
      :working="working"
      :errors="errors"
      :platform="platform"
      :handleInput="handleInput"
      @submitted="onFormSubmitted"
      @cancelled="onFormCancelled">
    </app-platform-form>
  </div><!-- /card-content -->
</template>

<script>
import PlatformForm from '../components/PlatformForm'

export default {
  components: {
    appPlatformForm: PlatformForm
  },

  props: {
    working: {
      type: Boolean,
      required: true
    },
    // any error messages from the API
    apiError: {
      type: String,
      required: false,
      default: ''
    },
    // the Platform object being edited
    platform: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    handleInput: {
      type: Function,
      required: false
    }
  },

  methods: {
    /** Callback for 'submit' button on form; simply emit the event upwards. */
    onFormSubmitted (value, event) {
      this.$emit('onFormSubmitted', value)
    },

    /** Callback for 'cancel' button on form; simply emit the event upwards. */
    onFormCancelled (value, event) {
      this.$emit('onFormCancelled', value)
    }
  }
}
</script>
