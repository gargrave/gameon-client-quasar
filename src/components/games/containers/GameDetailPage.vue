<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            {{ originalModel.title }}
          </div><!-- /card-title -->

          <app-game-edit-view
            v-if="editing"
            ref="editView"
            :apiError="apiError"
            :working="working"
            :errors="errors"
            :game="model"
            :platforms="platforms"
            :handleInput="handleInput"
            :handleSelect="handleSelect"
            :handleCheck="handleCheck"
            @onFormSubmitted="onFormSubmitted"
            @onFormCancelled="onFormCancelled">
          </app-game-edit-view>

          <app-game-detail-view
            v-else
            :game="model"
            @editClicked="onEditClick"
            @backClicked="onBackClick">
          </app-game-detail-view>

        </div><!-- /card -->

      </div><!-- /row -->

      <div
        v-if="editing"
        class="row justify-center">
        <div class="card">
          <div class="card-content">
            <button
              class="negative full-width"
              @click="onDeleteClick">
              Delete
            </button>
          </div>
        </div><!-- /card -->
      </div><!-- /row -->

    </div><!-- /layout-view -->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Loading } from 'quasar'
import { cloneDeep } from 'lodash'

import dialogs from '../../../globals/dialogs'
import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'
import GameModel from '../../../models/game'
import { areEqual, validate } from '../utils/gameValidator'

import GameDetailView from '../components/GameDetailView'
import GameEditView from '../components/GameEditView'

export default {
  components: {
    appGameDetailView: GameDetailView,
    appGameEditView: GameEditView
  },

  data: () => ({
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: '',
    // whether we are in editing or viewing mode
    editing: false,
    // the working copy of the instance
    model: GameModel.empty(),
    // the untouched copy of the original instance
    originalModel: GameModel.empty(),
    // local validation errors
    errors: GameModel.emptyValidationErrors()
  }),

  computed: {
    isWorking () {
      return this.working || this.gamesAjaxPending
    },

    ...mapGetters([
      'gamesAjaxPending',
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

    /** Callback for clicking the 'edit' button; simply change to 'editing' state. */
    onEditClick () {
      this.editing = true
    },

    /** Callback for clicking the 'back' button; simply return to list page. */
    onBackClick () {
      this.$router.push(localUrls.gamesList)
    },

    /** Callback for clicking the 'delete' button; send a request to delete this object. */
    onDeleteClick () {
      dialogs.confirmDelete('Game', () => {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Deleting Game...' })

        this.deleteGame(this.model.id)
          .then(() => {
            toasts.deleteConfirm('Game')
            this.$router.push(localUrls.gamesList)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      })
    },

    /**
     * prebuilds the request payload before verification; some of the fields (e.g. Platform)
     * need special parsing before going through validation
     */
    prebuildPayload (data, updateDates = true) {
      let payload = cloneDeep(data)

      // parse Platform from its title (string) to its ID (int)
      const platform = this.platforms.find(p => p.title === data.platform)
      payload.platform = platform ? platform.id : null

      if (updateDates) {
        // get lists of dates from embedded datepicker
        const datepicker = this.$refs.editView.$refs.form.$refs.datepicker
        payload.dates = datepicker.getDatesList()
        payload.datesRemoved = datepicker.getRemovedDatesList()
      }
      return payload
    },

    /** Attempts to submit the current user data to the API to login. */
    onFormSubmitted (value, event) {
      const payload = this.prebuildPayload(this.model)
      const game = GameModel.toAPI(payload)
      const compareTo = this.prebuildPayload(this.originalModel, false)
      const hasChanges = !areEqual(game, compareTo)
      const { errors, valid } = validate(game)

      if (valid && hasChanges) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Game...' })

        this.updateGame(game)
          .then(() => {
            toasts.updateConfirm('Game')
            this.$router.push(localUrls.gamesList)
            this.working = false
          }, err => { this.onError(err) })
      } else {
        if (!hasChanges) {
          toasts.noChanges()
        }
        this.errors = errors
      }
    },

    /**
     * Callback for 'cancel' button on form;
     * cancel the 'editing' state and revert the model.
     */
    onFormCancelled (value, event) {
      this.model = cloneDeep(this.originalModel)
      this.editing = false
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin',
      'findGame',
      'updateGame',
      'deleteGame'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        const gameId = this.$route.params.id
        if (!gameId) {
          this.$router.push(localUrls.gamesList)
        } else {
          this.findGame(gameId)
            .then(gameRes => {
              this.model = Object.assign({},
                cloneDeep(gameRes),
                { platform: gameRes.platform.title }
              )
              this.originalModel = cloneDeep(this.model)
              this.working = false
              this.initializing = false
              Loading.hide()
            }, () => {
              // if no valid instance, return to the List view
              this.$router.push(localUrls.gamesList)
            })
        }
      }, err => { this.onError(err) })
  }
}
</script>
