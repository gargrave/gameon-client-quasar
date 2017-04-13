<template>
  <form @submit.prevent="onSubmit">

    <!-- email input -->
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="text"
        class="form-control"
        :class="{ 'has-error': errors.email }"
        name="email"
        placeholder="Email"
        v-model.trim="loginData.email">
      <p class="form-error">{{ errors.email }}</p>
    </div>

    <!-- password input -->
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        :class="{ 'has-error': errors.password }"
        name="password"
        placeholder="Password"
        v-model.trim="loginData.password">
      <p class="form-error">{{ errors.password }}</p>
    </div>


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
    },

    // collection of validation errors
    errors: {
      type: Object,
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
      this.$emit('submitted', this.loginData)
    },

    onCancel () {
      this.$emit('cancelled')
    }
  }
}
</script>
