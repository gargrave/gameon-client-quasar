<template>
  <form @submit.prevent="onSubmit">

    <!-- title input -->
    <app-text-input
      ref="title"
      name="title"
      label="Title"
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

    // collection of validation errors
    errors: {
      type: Object,
      required: true
    }
  },

  methods: {
    onSubmit () {
      const payload = {
        title: this.$refs.title.model
      }
      this.$emit('submitted', payload)
    },

    onCancel () {
      this.$emit('cancelled')
    }
  }
}
</script>
