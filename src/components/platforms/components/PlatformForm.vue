<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- title input -->
    <app-text-input
      name="title"
      label="Title"
      maxlength="128"
      :value="platform.title"
      :error="errors.title"
      :handleInput="handleInput">
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
      @click.prevent="$emit('cancelled')">
      Cancel
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
    working: { type: Boolean, required: true },
    // local validation errors
    errors: { type: Object, required: true },
    // the platform (if any) being edited
    platform: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true }
  }
}
</script>
