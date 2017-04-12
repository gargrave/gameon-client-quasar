<template>
  <form @submit.prevent="onSubmit">

    <!-- email input -->
    <input
      type="text"
      class="form-item"
      name="email"
      placeholder="Email"
      v-model.trim="loginData.email">

    <!-- password input -->
    <input
      type="password"
      class="form-item"
      name="password"
      placeholder="Password"
      v-model.trim="loginData.password">

    <button class="primary outline" type="submit">
      Submit
    </button>

    <button class="secondary outline" @click.prevent="onCancel">
      Sign Up
    </button>

  </form>
</template>

<script>
export default {
  props: {
    // whether any operations are currently running
    working: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      // the current data entered into the form
      loginData: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    onSubmit () {
      // TODO need to validate before submisstion
      this.$emit('submitted', this.loginData)
    },

    onCancel () {
      this.$emit('cancelled')
    }
  }
}
</script>

<style>
.form-item {
  display: block;
}
</style>
