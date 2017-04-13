<template>
  <div class="layout-view">
    <div class="row justify-center small-gutter">
      <div>
        <h5>My Profile</h5>

        <p>First name: {{ profile.firstName }}</p>
        <p>Last name: {{ profile.lastName }}</p>

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
import { mapActions, mapGetters } from 'vuex'
import { Toast } from 'quasar'

import { localUrls } from '../../../globals/urls'

export default {
  data () {
    return {
      // whether any operations are currently running
      working: false
    }
  },

  computed: {
    ...mapGetters([
      'profile'
    ])
  },

  methods: {
    onLogout () {
      this.working = true
      this.logout()
        .then(() => {
          Toast.create.info('Logged out!')
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
