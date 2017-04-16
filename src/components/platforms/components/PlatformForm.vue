<template>
  <form @submit.prevent="onSubmit">

    <!-- title input -->
    <app-text-input
      ref="title"
      name="title"
      label="Title"
      :initialValue="originalPlatform && originalPlatform.title || ''"
      :error="errors.title">
    </app-text-input>

    <!-- 'submit' button -->
    <button
      class="primary outline"
      type="submit">
      Submit
    </button>

    <!-- cancel/back button -->
    <button
      class="secondary outline pull-right"
      @click.prevent="onCancel">
      Back
    </button>

  </form>
</template>

<script>
import validator from 'validator'

import { valErrs } from '../../../globals/errors'

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
    // collection of validation errors
    errors: {
      title: ''
    }
  }),

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
