<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">
        <!-- 'add a game' button -->
        <button
          class="list-view-add-button positive shadow-1"
          @click="onAddClick">
          Add a Game
        </button>
      </div>

      <div class="row justify-center"
        v-for="game in games">

        <app-game-card
          :game="game"
          @click="onGameClick">
        </app-game-card>

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'

import { localUrls } from '../../../globals/urls'

import GameCard from '../components/GameListCard'

export default {
  components: {
    appGameCard: GameCard
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
      return this.initializing || this.working || this.gamesAjaxPending
    },

    ...mapGetters([
      'gamesAjaxPending',
      'games'
    ])
  },

  methods: {
    /** Queries the store to update the local list of Games */
    rebuildGamesList () {
      this.apiError = ''
      this.working = true
      Loading.show({ message: 'Loading...' })

      this.getCachedOrFetchGames()
        .then(() => {
          this.working = false
          this.initializing = false
          Loading.hide()
        }, err => { this.onError(err) })
    },

    /** Callback for 'add new game' button click event */
    onAddClick () {
      this.$router.push(localUrls.gameCreate)
    },

    /** Callback for clicking on a Game card: routes to that Game's details page. */
    onGameClick ({ id }, event) {
      if (Number.isInteger(id)) {
        this.$router.push(`${localUrls.gamesList}/${id}`)
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
      'getCachedOrFetchGames'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        this.rebuildGamesList()
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
        Loading.hide()
      })
  }
}
</script>
