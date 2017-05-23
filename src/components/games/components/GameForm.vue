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
        placeholder="Select Platform"
        class="form-control"
        :class="{ 'has-error': errors.platform }"
        name="platform"
        type="list"
        v-model="selectedPlatform"
        :options="platformsForSelect">
      </q-select>
      <p class="form-error">{{ errors.platform }}</p>
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
        ref="dateEditor"
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
      type="button"
      @click.prevent="onCancel">
      Cancel
    </button>

  </form>
</template>

<script>
import { cloneDeep } from 'lodash'

import { areEqual, validate } from '../utils/gameValidator'
import GameModel from '../../../models/game'

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
    modelData: GameModel.empty(),
    errors: GameModel.emptyValidationErrors(),
    selectedPlatform: ''
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
    /** Builds the data structure required for submitting an update to the current Game */
    buildPayload () {
      let submitData = cloneDeep(this.modelData)
      submitData.title = this.$refs.title.model

      // set the platform; we need to parse this from a string to the full Platform object
      submitData.platform = this.platforms.find((p) =>
        p.title === this.selectedPlatform
      )

      // set the dates to the computed dates list (i.e. accounting for added/removed)
      submitData.dates = this.$refs['dateEditor'].getDatesList()

      // if any dates have been marked to be removed, add that list
      const datesRemoved = this.$refs['dateEditor'].getRemovedDatesList()
      if (datesRemoved.length) {
        submitData.datesRemoved = datesRemoved
      }

      return submitData
    },

    /** Callback for submit button; if data validates, emit the 'submitted' event. */
    onSubmit () {
      const payload = this.buildPayload()
      const hasChanges = !this.originalGame || !areEqual(payload, this.originalGame)
      const { errors, valid } = validate(payload)

      if (valid && hasChanges) {
        console.log('submit')
        // this.$emit('submitted', payload)
      } else {
        this.errors = errors
      }
    },

    /** Callback for cancel button; simply emit the 'cancelled' event. */
    onCancel () {
      this.$emit('cancelled')
    }
  },

  created () {
    // if we received an 'originalGame' prop, we are editing an existing one, so make a clone of it
    if (this.originalGame) {
      this.modelData = cloneDeep(this.originalGame)
      this.selectedPlatform = this.modelData.platform.title
    }
  }
}
</script>
