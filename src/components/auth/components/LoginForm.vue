<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- username input -->
    <app-text-input
      ref="username"
      name="username"
      label="Username"
      :error="errors.username"
      :value="user && user.username || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      ref="password"
      type="password"
      name="password"
      label="Password"
      :error="errors.password"
      :value="user && user.password || ''"
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
      Sign Up
    </button>

  </form>
</template>

<script>
import TextInput from '../../common/forms/TextInput2'

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
    },
    // user data model
    user: {
      type: Object,
      required: true
    },
    // callback for text input changing
    handleInput: {
      type: Function,
      required: true
    }
  }
}
</script>
