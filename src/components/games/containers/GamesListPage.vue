<template>
  <div class="layout-view">
    <div class="row justify-center">

      <div class="card">

        <div class="card-title bg-primary text-white">
          My Games
        </div><!-- /card-title -->

        <div class="card-content">
        </div><!-- /card-content -->

      </div><!-- /card -->

    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapActions } from 'vuex'

import { localUrls } from '../../../globals/urls'

export default {
  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: ''
  }),

  computed: {
    isWorking () {
      return this.initializing || this.working || this.platformsAjaxPending
    }
  },

  methods: {
    /** Queries the store to update the local list of Platforms */
    rebuildGamesList () {
      this.working = false
      this.initializing = false
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
    },

    ...mapActions([
      'checkForStoredLogin',
      'getCachedOrFetchPlatforms'
    ])
  },

  created () {
    this.working = true
    this.checkForStoredLogin()
      .then(() => {
        this.rebuildGamesList()
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
      })
  }
}
</script>
