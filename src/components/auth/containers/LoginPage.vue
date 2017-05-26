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
              :errors="errors"
              :user="user"
              :handleInput="handleInput"
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

import { localUrls } from '../../../globals/urls'
import UserLoginModel from '../../../models/userLogin'
import { validate } from '../utils/userLoginValidator'

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
      apiError: '',
      // model for login data
      user: UserLoginModel.empty(),
      // local validation errors
      errors: UserLoginModel.emptyValidationErrors()
    }
  },

  methods: {
    handleInput (e) {
      let key = e.target.name
      if (key in this.user) {
        this.user[key] = e.target.value
      }
    },

    /**
     * Attempts to submit the current user data to the API to login.
     */
    onFormSubmitted (value, event) {
      const user = UserLoginModel.toAPI(this.user)
      const { errors, valid } = validate(user)

      if (valid) {
        this.working = true
        Loading.show({ message: 'Logging in...' })

        this.login(user)
          .then(() => {
            Toast.create.positive('Logged in.')
            this.$router.push(localUrls.gamesList)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      } else {
        this.errors = errors
      }
    },

    onFormCancelled (value, event) {
      this.$router.push(localUrls.accountCreate)
    },

    onError (err) {
      this.errors = { username: '', password: '' }
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
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
