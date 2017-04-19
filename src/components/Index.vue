<template>
  <div class="layout-view">
    <div class="row justify-center">

      <div class="card">

        <div class="card-title bg-primary text-white">
          GameOn
        </div><!-- /card-title -->

        <div class="card-content">
        </div><!-- /card-content -->

      </div><!-- /card -->

    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapActions } from 'vuex'

import { localUrls } from '../globals/urls'

export default {
  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false
  }),

  computed: {
    isWorking () {
      return this.initializing || this.working
    }
  },

  methods: {
    ...mapActions([
      'checkForStoredLogin'
    ])
  },

  created () {
    this.working = true
    this.checkForStoredLogin()
      .then(() => {
        this.$router.push(localUrls.gamesList)
        this.working = false
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
      })
  }
}
</script>
