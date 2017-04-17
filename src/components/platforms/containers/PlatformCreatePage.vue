<template>
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
            @submitted="onFormSubmitted"
            @cancelled="onFormCancelled">
          </app-platform-form>
        </div><!-- /card-content -->

      </div><!-- /card -->

    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapActions } from 'vuex'

import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import platformData from '../../../data/platform-data'

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
    newPlatform: platformData.buildPlatform()
  }),

  methods: {
    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    onFormSubmitted (value) {
      const newPlatform = platformData.buildDataForCreate(value)

      this.working = true
      this.apiError = ''

      this.createPlatform(newPlatform)
        .then(res => {
          toasts.createConfirm('Platform')
          this.$router.push(`${localUrls.platformsList}/${res.id}`)
          this.working = false
        }, err => { this.onError(err) })
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.platformsList)
    },

    /** Handle any errors received from calls to the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
    },

    ...mapActions([
      'checkForStoredLogin',
      'createPlatform'
    ])
  },

  created () {
    this.working = true
    this.checkForStoredLogin()
      .then(() => {
        // if logged in, no further action needed
        this.initializing = false
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
        this.initializing = false
      })
  }
}
</script>
