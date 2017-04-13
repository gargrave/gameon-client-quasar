<template>
  <form @submit.prevent="onSubmit">

    <!-- email input -->
    <app-text-input
      ref="email"
      name="email"
      label="Email"
      :error="errors.email">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      ref="password"
      type="password"
      name="password"
      label="Password"
      :error="errors.password">
    </app-text-input>

    <!-- submit button -->
    <button
      class="primary outline"
      type="submit">
      Submit
    </button>

    <!-- cancel/back button -->
    <button
      class="secondary outline pull-right"
      @click.prevent="onCancel">
      Log In
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
        email: this.$refs.email.model,
        password: this.$refs.password.model
      }
      this.$emit('submitted', payload)
    },

    onCancel () {
      this.$emit('cancelled')
    }
  }
}
</script>
