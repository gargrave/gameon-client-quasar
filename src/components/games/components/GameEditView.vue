<template>
  <div class="card-content">
    <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
    <app-game-form
      ref="form"
      :working="working"
      :errors="errors"
      :game="game"
      :platforms="platforms"
      :handleInput="handleInput"
      :handleSelect="handleSelect"
      :handleCheck="handleCheck"
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
    // any error messages from the API
    apiError: { type: String, required: false, default: '' },
    // whether any operations are currently running
    working: { type: Boolean, required: true },
    // local validation errors
    errors: { type: Object, required: true },
    // the Game object being edited
    game: { type: Object, required: true },
    // list of available platforms
    platforms: { type: Array, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true },
    // callback for text select changing
    handleSelect: { type: Function, required: true },
    // callback for text checkbox changing
    handleCheck: { type: Function, required: true }
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
