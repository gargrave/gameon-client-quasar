<template>
  <div class="layout-view">
    <div class="row justify-center small-gutter">
      <div>

        <h5>LoginPage</h5>

        <p v-if="apiError" style="color: red;">Error: {{ apiError }}</p>

        <app-login-form
          :working="working"
          @submitted="onFormSubmitted"
          @cancelled="onFormCancelled">
        </app-login-form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Toast } from 'quasar'

import { localUrls } from '../../../globals/urls'

import LoginForm from '../components/LoginForm'

export default {
  components: {
    appLoginForm: LoginForm
  },

  data () {
    return {
      // whether any operations are currently running
      working: false,

      // error messages returned from API (e.g. invalid login)
      apiError: ''
    }
  },

  methods: {
    /**
     * Attempts to submit the current user data to the API to login.
     */
    onFormSubmitted (value, event) {
      const user = {
        email: value.email,
        password: value.password
      }

      this.working = true
      this.apiError = ''

      this.login(user)
        .then(() => {
          Toast.create.positive('Logged in.')
          this.$router.push(localUrls.gamesList)
          this.working = false
        }, err => { this.onError(err) })
    },

    onFormCancelled (value, event) {
      this.$router.push(localUrls.accountCreate)
    },

    onError (err) {
      this.apiError = err.message || ''
      this.working = false
    },

    ...mapActions([
      'checkForStoredLogin',
      'login'
    ])
  },

  created () {
    // if we already logged in, redirect to account/profile page
    this.working = true
    this.checkForStoredLogin()
      .then(() => {
        this.$router.push(localUrls.account)
        this.working = false
      }, err => { this.onError(err) })
  }
}
</script>
