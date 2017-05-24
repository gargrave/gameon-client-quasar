<template>
  <form @submit.prevent="onSubmit">

    <!-- title input -->
    <app-text-input
      ref="title"
      name="title"
      label="Title"
      maxlength="128"
      :initialValue="originalPlatform && originalPlatform.title || ''"
      :error="errors.title">
    </app-text-input>

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
import { cloneDeep } from 'lodash'

import toasts from '../../../globals/toasts'
import PlatformModel from '../../../models/platform'
import { areEqual, validate } from '../utils/platformValidator'

import TextInput from '../../common/forms/TextInput'

export default {
  components: {
    appTextInput: TextInput
  },

  props: {
    // whether any operations are currently running
    working: {
      type: Boolean,
      required: true
    },
    // the platform (if any) being edited
    originalPlatform: {
      type: Object,
      required: false
    }
  },

  data: () => ({
    modelData: PlatformModel.empty(),
    errors: PlatformModel.emptyValidationErrors()
  }),

  methods: {
    /** Callback for submit button; if data validates, emit the 'submitted' event. */
    onSubmit () {
      const payload = Object.assign({},
        cloneDeep(this.modelData),
        { title: this.$refs.title.model }
      )
      const hasChanges = !this.originalPlatform || !areEqual(payload, this.originalPlatform)
      const { errors, valid } = validate(payload)

      if (valid && hasChanges) {
        this.$emit('submitted', payload)
      } else {
        if (!hasChanges) {
          toasts.noChanges()
        }
        this.errors = errors
      }
    },

    /** Callback for cancel button; simply emit the 'cancelled' event. */
    onCancel () {
      this.$emit('cancelled')
    }
  },

  created () {
    // if we received an 'originalPlatform' prop, we are editing an existing one, so make a clone of it
    if (this.originalPlatform) {
      this.modelData = cloneDeep(this.originalPlatform)
    }
  }
}
</script>
