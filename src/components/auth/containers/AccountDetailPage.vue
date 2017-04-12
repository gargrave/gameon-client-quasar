<template>
  <div class="layout-view">
    <div class="row justify-center small-gutter">
      <div>
        <h5>AccountDetailPage</h5>
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
    ...mapActions([
      'checkForStoredLogin'
    ])
  },

  created () {
    // redirect to login page if not logged in
    this.working = true
    this.checkForStoredLogin()
      .then(res => {
        this.working = false
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
      })
  }
}
</script>
