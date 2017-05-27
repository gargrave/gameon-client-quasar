<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- username input -->
    <app-text-input
      name="username"
      label="Username"
      :error="errors.username"
      :value="user && user.username || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- email input -->
    <app-text-input
      name="email"
      label="Email"
      :error="errors.email"
      :value="user && user.email || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      type="password"
      name="password1"
      label="Password"
      :error="errors.password1"
      :value="user && user.password1 || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      type="password"
      name="password2"
      label="Re-enter Password"
      :error="errors.password2"
      :value="user && user.password2 || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- submit button -->
    <button
      class="positive"
      type="submit">
      Submit
    </button>

    <!-- cancel/back button -->
    <button
      class="secondary pull-right"
      @click.prevent="$emit('cancelled')">
      Log In
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
    working: { type: Boolean, required: true },
    // collection of validation errors
    errors: { type: Object, required: true },
    // user data model
    user: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true }
  }
}
</script>
