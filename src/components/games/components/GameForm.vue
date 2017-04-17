<template>
  <form @submit.prevent="onSubmit">

    <!-- title input -->
    <app-text-input
      ref="title"
      name="title"
      label="Title"
      maxlength="128"
      :initialValue="originalGame && originalGame.title || ''"
      :error="errors.title">
    </app-text-input>

    <!-- platform selector -->
    <div class="form-group">
      <label for="platforms">Platform</label>
      <q-select
        class="form-control"
        name="platform"
        type="list"
        v-model="selectedPlatform"
        :options="platformsForSelect">
      </q-select>
    </div>

    <!-- 'finished' checkbox -->
    <div class="form-group">
      <label>
        <q-checkbox v-model="modelData.finished"></q-checkbox>
        Finished
      </label>
    </div>

    <div class="form-group">
      <app-game-date-picker
        :working="working"
        :dates="datesForDatePicker">
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
      @click.prevent="onCancel">
      Cancel
    </button>

  </form>
</template>

<script>
import validator from 'validator'

import gameData from '../../../data/game-data'
import { valErrs } from '../../../globals/errors'
import toasts from '../../../globals/toasts'

import TextInput from '../../common/forms/TextInput'
import GameDatePicker from './GameDatePicker'

export default {
  components: {
    appTextInput: TextInput,
    appGameDatePicker: GameDatePicker
  },

  props: {
    // whether any operations are currently running
    working: {
      type: Boolean,
      required: true
    },
    // the game (if any) being edited
    originalGame: {
      type: Object,
      required: false
    },
    // list of available platforms
    platforms: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    modelData: gameData.buildGame(),
    selectedPlatform: '',
    // collection of validation errors
    errors: {
      title: ''
    }
  }),

  computed: {
    platformsForSelect () {
      return this.platforms.map((p) => {
        return {
          key: p.id,
          label: p.title,
          value: p.title
        }
      })
    },

    datesForDatePicker () {
      return this.originalGame ? this.originalGame.dates : []
    }
  },

  methods: {
    /**
     * Checks if the data submitted by the form is valid, and sets any necessary error messages.
     * @return Whether the data is valid.
     */
    isValid (val) {
      let valid = true

      // validate title
      this.errors.title = ''
      if (!validator.isLength(val.title, { min: 1, max: 128 })) {
        this.errors.title = valErrs.length(1, 128)
        valid = false
      }

      // if we have an 'original' value, compare it against the new value to ensure that something has changed
      // if not, do not submit the update request
      if (this.originalGame) {
        const updatedGame = gameData.buildGame(val)
        if (gameData.areIndentical(this.originalGame, updatedGame)) {
          toasts.noChanges()
          valid = false
        }
      }

      return valid
    },

    /** Callback for submit button; if data validates, emit the 'submitted' event. */
    onSubmit () {
      const payload = {
        title: this.$refs.title.model
      }

      if (this.isValid(payload)) {
        this.$emit('submitted', payload)
      }
    },

    /** Callback for cancel button; simply emit the 'cancelled' event. */
    onCancel () {
      this.$emit('cancelled')
    }
  }
}
</script>
