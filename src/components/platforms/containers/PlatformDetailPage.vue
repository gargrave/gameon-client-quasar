<template>
  <div class="layout-view">
    <div class="row justify-center">

      <div class="card">

        <div class="card-title bg-primary text-white">
          {{ platform.title }}
        </div><!-- /card-title -->

        <app-platform-edit-view
          v-if="editing"
          :working="working"
          :apiError="apiError"
          :platform="platform"
          @onFormSubmitted="onFormSubmitted"
          @onFormCancelled="onFormCancelled">
        </app-platform-edit-view>

        <app-platform-detail-view
          v-else
          :platform="platform"
          @editClicked="onEditClick">
        </app-platform-detail-view>

      </div><!-- /card -->

    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import platformData from '../../../data/platform-data'
import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'

import PlatformDetailView from '../components/PlatformDetailView'
import PlatformEditView from '../components/PlatformEditView'

export default {
  components: {
    appPlatformDetailView: PlatformDetailView,
    appPlatformEditView: PlatformEditView
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // whether we are in editing or viewing mode
    editing: false,
    // the working copy of the instance
    platform: platformData.buildPlatform()
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
    onEditClick () {
      this.editing = true
    },

    /** Attempts to submit the current user data to the API to login. */
    onFormSubmitted (value, event) {
      const updatedData = platformData.buildDataForUpdate(this.platform, value)

      if (platformData.areIndentical(updatedData, this.platform)) {
        // if the instance has not changed, show a message and do not submit the update
        toasts.noChanges()
      } else {
        // otherwise, submit the update to the API
        this.working = true
        this.apiError = ''

        this.updatePlatform(updatedData)
          .then(() => {
            this.$router.push(localUrls.platformsList)
            this.working = false
          }, err => { this.onError(err) })
      }
    },

    /** Callback for 'cancel' button on form; simply cancel the 'editing' state. */
    onFormCancelled (value, event) {
      this.editing = false
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
    },

    ...mapActions([
      'checkForStoredLogin',
      'findPlatform',
      'updatePlatform'
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
              this.platform = Object.assign({}, platformRes)
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
