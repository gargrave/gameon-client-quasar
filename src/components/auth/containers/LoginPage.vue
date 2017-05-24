<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">
        <div class="card">

          <div class="card-title bg-primary text-white">
            Log In
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
            <app-login-form
              :working="working"
              :errors="validationErrors"
              @submitted="onFormSubmitted"
              @cancelled="onFormCancelled">
            </app-login-form>
          </div><!-- /card-content -->

        </div><!-- /card -->
      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import { Loading, Toast } from 'quasar'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
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

      // form validation errors (if any)
      validationErrors: {
        username: '',
        password: ''
      },

      // error messages returned from API (e.g. invalid login)
      apiError: ''
    }
  },

  methods: {
    /**
     * Attempts to submit the current user data to the API to login.
     */
    onFormSubmitted (value, event) {
      if (this.isValid(value)) {
        const userPayload = {
          username: value.username,
          password: value.password
        }

        this.working = true
        Loading.show({ message: 'Logging in...' })

        this.login(userPayload)
          .then(() => {
            Toast.create.positive('Logged in.')
            this.$router.push(localUrls.gamesList)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      }
    },

    onFormCancelled (value, event) {
      this.$router.push(localUrls.accountCreate)
    },

    onError (err) {
      this.validationErrors = { username: '', password: '' }
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
    },

    /**
     * Checks if the data submitted by the form is valid, and sets any necessary error messages.
     * @return Whether the data is valid.
     */
    isValid (val) {
      let valid = true

      // validate username
      this.validationErrors.username = ''
      // if (!validator.isEmail(val.email)) {
      //   this.validationErrors.email = valErrs.email
      //   valid = false
      // }

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
      'login'
    ])
  },

  created () {
    // if we already logged in, redirect to account/profile page
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.$router.push(localUrls.account)
      }, err => { this.onError(err) })
  }
}
</script>
