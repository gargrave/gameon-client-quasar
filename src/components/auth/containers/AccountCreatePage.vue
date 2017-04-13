<template>
  <div class="layout-view">
    <div class="row justify-center small-gutter">
      <div>

        <h5>AccountCreatePage</h5>

        <p v-if="apiError" style="color: red;">Error: {{ apiError }}</p>

        <app-account-form
          :working="working"
          @submitted="onFormSubmitted"
          @cancelled="onFormCancelled">
        </app-account-form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Toast } from 'quasar'

import { localUrls } from '../../../globals/urls'

import AccountForm from '../components/AccountForm'

export default {
  components: {
    appAccountForm: AccountForm
  },

  data () {
    return {
      // whether any operations are currently running
      working: false,

      // error messages returned from API (e.g. invalid login)
      apiError: 'This is an error'
    }
  },

  methods: {
    /**
     * Attempts to submit the current user data to the API to login.
     */
    onFormSubmitted (value, event) {
      const userData = {
        email: value.email,
        password: value.password
      }

      this.working = true
      this.apiError = ''

      this.createUser(userData)
        .then(() => {
          Toast.create.positive('Account created!')
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
      'login',
      'createUser'
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
