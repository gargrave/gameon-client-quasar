<template>
  <div class="layout-view">
    <div class="row justify-center small-gutter">
      <div>
        <h5>AccountDetailPage</h5>
        <button
          class="primary outline"
          @click="onLogout">
            Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { localUrls } from '../../../globals/urls'

export default {
  data () {
    return {
      // whether any operations are currently running
      working: false
    }
  },

  methods: {
    onLogout () {
      this.working = true
      this.logout()
        .then(() => {
          this.$router.push(localUrls.login)
          this.working = false
        })
    },

    ...mapActions([
      'checkForStoredLogin',
      'logout'
    ])
  },

  created () {
    // redirect to login page if not logged in
    this.working = true
    this.checkForStoredLogin()
      .then(() => {
        this.working = false
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
      })
  }
}
</script>
