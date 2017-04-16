<template>
  <div class="layout-view">
    <div class="row justify-center">

      <div class="card">

        <div class="card-title bg-primary text-white">
          {{ originalPlatform.title }}
        </div><!-- /card-title -->

        <div class="card-content">
          <p><strong>Name:</strong> {{ originalPlatform.title }}</p>
          <p><strong>Added on:</strong> {{ originalPlatform.createdAt }}</p>

          <hr>
          <button
            class="outline primary"
            @click="onEditClick">
            Edit
          </button>
        </div><!-- /card-content -->

      </div><!-- /card -->

    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import platformData from '../../../data/platform-data'
import { localUrls } from '../../../globals/urls'

export default {
  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // the working copy of the instance
    platform: platformData.buildPlatform(),
    // a copy of the instance, used for checking for changes
    originalPlatform: platformData.buildPlatform()
  }),

  computed: {
    isWorking () {
      return this.working || this.platformsAjaxPending
    },

    ...mapGetters([
      'platformsAjaxPending'
    ])
  },

  methods: {
     /**
     * Sets the data for the local instance. Note that we are creating two
     * objects, so that we can compare original vs. updated values, in order to
     * disable form submission as appropriate.
     */
    setLocalObjectData (obj) {
      this.platform = Object.assign({}, obj)
      this.originalPlatform = Object.assign({}, obj)
    },

    onEditClick () {
      console.log('onEditClick')
    },

    /** Attempts to submit the current user data to the API to login. */
    onFormSubmitted (value, event) {
      const updatedData = platformData.buildDataForUpdate(value)

      if (platformData.areIndentical(updatedData, this.originalPlatform)) {
        // if the instance has not changed, show a message and do not submit the update
        // TODO: Show a Toast here
      } else {
        // otherwise, submit the update to the API
        this.working = true
        this.apiError = ''

        this.updatePlatform(updatedData)
          .then(() => {
            this.$router.push(localUrls.platformsList)
            this.working = false
          }, (err) => {
            this.handleApiError(err)
          })
      }
    },

    /** Callback for 'cancel' button on form; simply go back one step in history. */
    onFormCancelled (value, event) {
      this.$router.go(-1)
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
    },

    ...mapActions([
      'checkForStoredLogin',
      'findPlatform'
    ])
  },

  created () {
    this.working = true

    this.checkForStoredLogin()
      .then(() => {
        const platformId = this.$route.params.id
        if (!platformId) {
          this.$router.push(localUrls.platformsList)
        } else {
          this.findPlatform(platformId)
            .then(platformRes => {
              // if we get a valid instance, save two local copies
              this.setLocalObjectData(platformRes)
              this.working = false
              this.initializing = false
            }, () => {
              // if no valid instance, return to the List view
              this.$router.push(localUrls.platformsList)
              this.working = false
              this.initializing = false
            })
        }
      }, err => { this.onError(err) })
  }
}
</script>
