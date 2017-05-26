<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            Create a Platform
          </div><!-- /card-title -->

          <div class="card-content">
            <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
            <app-platform-form
              :working="working"
              :errors="errors"
              :handleInput="handleInput"
              @submitted="onFormSubmitted"
              @cancelled="onFormCancelled">
            </app-platform-form>
          </div><!-- /card-content -->

        </div><!-- /card -->

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import { Loading } from 'quasar'

import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import PlatformModel from '../../../models/platform'
import { validate } from '../utils/platformValidator'

import PlatformForm from '../components/PlatformForm'

export default {
  components: {
    appPlatformForm: PlatformForm
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // model for new Platform
    platform: PlatformModel.empty(),
    // local validation errors
    errors: PlatformModel.emptyValidationErrors()
  }),

  methods: {
    handleInput (e) {
      let key = e.target.name
      if (key in this.platform) {
        this.platform[key] = e.target.value
      }
    },

    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    onFormSubmitted (value) {
      const platform = PlatformModel.toAPI(this.platform)
      const { errors, valid } = validate(platform)

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Platform...' })

        this.createPlatform(platform)
          .then(res => {
            toasts.createConfirm('Platform')
            this.$router.push(`${localUrls.platformsList}/${res.id}`)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      } else {
        this.errors = errors
      }
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.platformsList)
    },

    /** Handle any errors received from calls to the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'createPlatform'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        // if logged in, no further action needed
        this.initializing = false
        Loading.hide()
      }, () => {
        this.$router.push(localUrls.login)
      })
  }
}
</script>
