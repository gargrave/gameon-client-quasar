<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            Create a Game
          </div><!-- /card-title -->

          <div
            v-if="platforms.length"
            class="card-content">
            <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
            <app-game-form
              ref="form"
              :working="working"
              :errors="errors"
              :game="model"
              :platforms="platforms"
              :handleInput="handleInput"
              :handleSelect="handleSelect"
              :handleCheck="handleCheck"
              @submitted="onFormSubmitted"
              @cancelled="onFormCancelled">
            </app-game-form>
          </div><!-- /card-content with form -->

          <div
            v-else
            class="card-content text-center">
            <p>Oops! You must have at least one Platform before adding a new Game.</p>
            <button
              class="positive"
              @click="onAddPlatformClick">
              Add a Platform
            </button>
          </div><!-- /card-content with form -->

        </div><!-- /card -->

      </div><!-- /row -->
    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
import { cloneDeep } from 'lodash'

import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import GameModel from '../../../models/game'
import { validate } from '../utils/gameValidator'

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
    model: GameModel.empty(),
    // local validation errors
    errors: GameModel.emptyValidationErrors()
  }),

  computed: {
    ...mapGetters([
      'platforms'
    ])
  },

  methods: {
    /** callback for handling changes to input fields */
    handleInput (e) {
      let key = e.target.name
      if (key in this.model) {
        this.model[key] = e.target.value
      }
    },

    /** callback for handling changes to select fields */
    handleSelect (value) {
      this.model.platform = value
    },

    /** callback for handling changes to checkbox fields */
    handleCheck (value) {
      this.model.finished = value
    },

    /**
     * prebuilds the request payload before verification; some of the fields (e.g. Platform)
     * need special parsing before going through validation
     */
    prebuildPayload () {
      let payload = cloneDeep(this.model)

      // parse Platform from its title (string) to its ID (int)
      const platform = this.platforms.find(p => p.title === this.model.platform)
      payload.platform = platform ? platform.id : null

      // get lists of dates from embedded datepicker
      const datepicker = this.$refs.form.$refs.datepicker
      payload.dates = datepicker.getDatesList()
      payload.datesRemoved = datepicker.getRemovedDatesList()

      return payload
    },

    /** Callback for 'submit' event from the form; attempt to create a new instance on the server. */
    onFormSubmitted (value) {
      const payload = this.prebuildPayload()
      const game = GameModel.toAPI(payload)
      const { errors, valid } = validate(game)

      if (valid) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Game...' })

        this.createGame(game)
          .then(res => {
            toasts.createConfirm('Game')
            this.$router.push(`${localUrls.gamesList}/${res.id}`)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      } else {
        this.errors = errors
      }
    },

    /** Callback for 'cancelled' event from the form; simply go back to list page. */
    onFormCancelled () {
      this.$router.push(localUrls.gamesList)
    },

    /** Callback for 'add new platform' button click event */
    onAddPlatformClick () {
      this.$router.push(localUrls.platformCreate)
    },

    /** Handle any errors received from calls to the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'createGame'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        // if logged in, no further action needed
        this.initializing = false
        Loading.hide()
      }, () => {
        this.$router.push(localUrls.login)
      })
  }
}
</script>
