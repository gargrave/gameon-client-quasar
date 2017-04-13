<template>
  <div class="layout-view">
    <div class="row justify-center">
      <div class="card">

        <div class="card-title bg-primary text-white">
          Sign Up
        </div><!-- /card-title -->

        <div class="card-content">
          <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
          <app-account-form
            :working="working"
            :errors="validationErrors"
            @submitted="onFormSubmitted"
            @cancelled="onFormCancelled">
          </app-account-form>
        </div><!-- /card-content -->

      </div><!-- /card -->
    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapActions } from 'vuex'
import { Toast } from 'quasar'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
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

      // form validation errors (if any)
      validationErrors: {
        email: '',
        password: ''
      },

      // error messages returned from API (e.g. invalid login)
      apiError: 'This is an error'
    }
  },

  methods: {
    /**
     * Attempts to submit the current user data to the API to login.
     */
    onFormSubmitted (value, event) {
      if (this.isValid(value)) {
        const userData = {
          email: value.email,
          password: value.password
        }

        this.working = true

        this.createUser(userData)
          .then(() => {
            Toast.create.positive('Account created!')
            this.$router.push(localUrls.gamesList)
            this.working = false
          }, err => { this.onError(err) })
      }
    },

    onFormCancelled (value, event) {
      this.$router.push(localUrls.login)
    },

    onError (err) {
      this.validationErrors = { email: '', password: '' }
      this.apiError = err.message || ''
      this.working = false
    },

    /**
     * Checks if the data submitted by the form is valid, and sets any necessary error messages.
     * @return Whether the data is valid.
     */
    isValid (val) {
      let valid = true

      // validate email
      this.validationErrors.email = ''
      if (!validator.isEmail(val.email)) {
        this.validationErrors.email = valErrs.email
        valid = false
      }

      // validate password
      this.validationErrors.password = ''
      if (!validator.isLength(val.password, { min: 6 })) {
        this.validationErrors.password = valErrs.password
        valid = false
      }

      return valid
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
