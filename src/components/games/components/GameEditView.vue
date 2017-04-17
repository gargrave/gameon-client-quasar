<template>
  <div class="card-content">
    <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
    <app-game-form
      :working="working"
      :originalGame="game"
      @submitted="onFormSubmitted"
      @cancelled="onFormCancelled">
    </app-game-form>
  </div><!-- /card-content -->
</template>

<script>
import GameForm from '../components/GameForm'

export default {
  components: {
    appGameForm: GameForm
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
    // the Game object being edited
    game: {
      type: Object,
      required: true
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
