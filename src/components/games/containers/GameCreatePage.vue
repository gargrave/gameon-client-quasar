<template>
  <div class="layout-view">
    <div class="row justify-center">

      <div class="card">

        <div class="card-title bg-primary text-white">
          Create a Game
        </div><!-- /card-title -->

        <div class="card-content">
          <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
          <app-game-form
            :working="working"
            :platforms="platforms"
            @submitted="onFormSubmitted"
            @cancelled="onFormCancelled">
          </app-game-form>
        </div><!-- /card-content -->

      </div><!-- /card -->

    </div><!-- /row -->
  </div><!-- /layout-view -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import gameData from '../../../data/game-data'

import GameForm from '../components/GameForm'

export default {
  components: {
    appGameForm: GameForm
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // model for new Game
    newGame: gameData.buildGame()
  }),

  computed: {
    ...mapGetters([
      'platforms'
    ])
  },

  methods: {
    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    onFormSubmitted (value) {
      const newGame = gameData.buildDataForCreate(value)

      this.working = true
      this.apiError = ''

      this.createGame(newGame)
        .then(res => {
          toasts.createConfirm('Game')
          this.$router.push(`${localUrls.gamesList}/${res.id}`)
          this.working = false
        }, err => { this.onError(err) })
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.gamesList)
    },

    /** Handle any errors received from calls to the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
    },

    ...mapActions([
      'checkForStoredLogin',
      'createGame'
    ])
  },

  created () {
    this.working = true
    this.checkForStoredLogin()
      .then(() => {
        // if logged in, no further action needed
        this.initializing = false
      }, () => {
        this.$router.push(localUrls.login)
        this.working = false
        this.initializing = false
      })
  }
}
</script>
