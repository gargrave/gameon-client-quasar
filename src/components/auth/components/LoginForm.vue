<template>
  <form @submit.prevent="onSubmit">

    <!-- username input -->
    <app-text-input
      ref="username"
      name="username"
      label="Username"
      :error="errors.username">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      ref="password"
      type="password"
      name="password"
      label="Password"
      :error="errors.password">
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
      Sign Up
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
        username: this.$refs.username.model,
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
