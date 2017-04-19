<template>
  <transition name="fade">
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
  </transition>
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
      validationErrors: this.getDefaultValidationErrors(),

      // error messages returned from API (e.g. invalid user data)
      apiError: 'This is an error'
    }
  },

  methods: {
    getDefaultValidationErrors () {
      return {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    },

    /**
     * Attempts to submit the current user data to the API to create a new user.
     */
    onFormSubmitted (value, event) {
      if (this.isValid(value)) {
        const userPayload = {
          username: value.username,
          email: value.email,
          password1: value.password,
          password2: value.passwordConfirm
        }

        this.working = true

        this.createUser(userPayload)
          .then(() => {
            Toast.create.positive('Account created!')
            this.$router.push(localUrls.account)
            this.working = false
          }, err => { this.onError(err) })
      }
    },

    onFormCancelled (value, event) {
      this.$router.push(localUrls.login)
    },

    onError (err) {
      this.validationErrors = this.getDefaultValidationErrors()
      this.apiError = err.message || ''
      this.working = false
    },

    /**
     * Checks if the data submitted by the form is valid, and sets any necessary error messages.
     * @return Whether the data is valid.
     */
    isValid (val) {
      let valid = true

      // validate username
      this.validationErrors.username = ''

      // validate password
      this.validationErrors.password = ''
      if (!validator.isLength(val.password, { min: 8 })) {
        this.validationErrors.password = valErrs.length(8)
        valid = false
      }

      return valid
    },

    ...mapActions([
      'checkForStoredLogin',
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
