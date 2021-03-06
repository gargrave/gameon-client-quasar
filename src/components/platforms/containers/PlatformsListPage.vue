<template>
  <transition name="fade">
    <div class="layout-view">

      <div class="row justify-center">
        <!-- 'add a platform' button -->
        <button
          class="list-view-add-button positive shadow-1"
          @click="onAddClick">
          Add a Platform
        </button>
      </div><!-- /row -->

      <section v-if="initializing">
        <app-initializing-card></app-initializing-card>
      </section>

      <section v-else>
        <section v-if="platforms.length">
          <div
            class="row justify-center"
            v-for="platform in platforms">
            <app-platform-card
              :platform="platform"
              @click="onPlatformClick">
            </app-platform-card>
          </div><!-- /row -->
        </section>

        <app-empty-list-card
          v-else
          itemName="Platforms">
        </app-empty-list-card>
      </section>

    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'

import { localUrls } from '../../../globals/urls'

import EmptyListCard from '../../common/EmptyListCard'
import InitializingCard from '../../common/InitializingCard'
import PlatformCard from '../components/PlatformListCard'

export default {
  components: {
    appEmptyListCard: EmptyListCard,
    appInitializingCard: InitializingCard,
    appPlatformCard: PlatformCard
  },

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
    },

    ...mapGetters([
      'platformsAjaxPending',
      'platforms'
    ])
  },

  methods: {
    /** Queries the store to update the local list of Platforms */
    rebuildPlatformsList () {
      this.apiError = ''
      this.working = true
      Loading.show({ message: 'Loading...' })

      this.getCachedOrFetchPlatforms()
        .then(() => {
          this.working = false
          this.initializing = false
          Loading.hide()
        }, err => { this.onError(err) })
    },

    /** Callback for 'add new platform' button click event */
    onAddClick () {
      this.$router.push(localUrls.platformCreate)
    },

    /** Callback for clicking on a Platform card: routes to that Platform's details page. */
    onPlatformClick ({ id }, event) {
      if (Number.isInteger(id)) {
        this.$router.push(`${localUrls.platformsList}/${id}`)
      }
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
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.rebuildPlatformsList()
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
        Loading.hide()
      })
  }
}
</script>
