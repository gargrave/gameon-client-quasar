<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            My Profile
          </div><!-- /card-title -->

          <div class="card-content">
            <p><strong>Name:</strong> {{ profile.firstName }} {{ profile.lastName }}</p>
            <p><strong>Email:</strong> {{ userData.email }}</p>

            <hr>
            <button
              class="secondary"
              @click="onLogout">
                Logout
            </button>
          </div><!-- /card-content -->

        </div><!-- /card -->

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
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
      'userData',
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
