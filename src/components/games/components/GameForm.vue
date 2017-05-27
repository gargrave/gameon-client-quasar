<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- title input -->
    <app-text-input
      name="title"
      label="Title"
      maxlength="128"
      :value="game.title"
      :error="errors.title"
      :handleInput="handleInput">
    </app-text-input>

    <!-- platform selector -->
    <div class="form-group">
      <label for="platforms">Platform</label>
      <q-select
        placeholder="Select Platform"
        class="form-control"
        :class="{ 'has-error': errors.platform }"
        name="platform"
        type="list"
        :value="game.platform"
        :options="platformsForSelect"
        @input="handleSelect">
      </q-select>
      <p class="form-error">{{ errors.platform }}</p>
    </div>

    <!-- 'finished' checkbox -->
    <div class="form-group">
      <label>
        <q-checkbox
          :value="game.finished"
          @input="handleCheck">
        </q-checkbox>
        Finished
      </label>
    </div>

    <div class="form-group">
      <app-game-date-picker
        ref="datepicker"
        :working="working"
        :dates="game.dates">
      </app-game-date-picker>
    </div>

    <!-- 'submit' button -->
    <button
      class="positive"
      type="submit">
      Submit
    </button>

    <!-- cancel/back button -->
    <button
      class="secondary pull-right"
      type="button"
      @click.prevent="$emit('cancelled')">
      Cancel
    </button>

  </form>
</template>

<script>
import TextInput from '../../common/forms/TextInput2'
import GameDatePicker from './GameDatePicker'

export default {
  components: {
    appTextInput: TextInput,
    appGameDatePicker: GameDatePicker
  },

  props: {
    // whether any operations are currently running
    working: { type: Boolean, required: true },
    // local validation errors
    errors: { type: Object, required: true },
    // the game (if any) being edited
    game: { type: Object, required: false },
    // list of available platforms
    platforms: { type: Array, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true },
    // callback for text select changing
    handleSelect: { type: Function, required: true },
    // callback for text checkbox changing
    handleCheck: { type: Function, required: true }
  },

  computed: {
    /* builds the platforms list in the format required by q-select */
    platformsForSelect () {
      return this.platforms.map((p) => {
        return {
          key: p.id,
          label: p.title,
          value: p.title
        }
      })
    }
  }
}
</script>
