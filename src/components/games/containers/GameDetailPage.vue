<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            {{ game.title }}
          </div><!-- /card-title -->

          <app-game-edit-view
            v-if="editing"
            :working="working"
            :apiError="apiError"
            :game="game"
            :platforms="platforms"
            @onFormSubmitted="onFormSubmitted"
            @onFormCancelled="onFormCancelled">
          </app-game-edit-view>

          <app-game-detail-view
            v-else
            :game="game"
            @editClicked="onEditClick"
            @backClicked="onBackClick">
          </app-game-detail-view>

        </div><!-- /card -->

      </div><!-- /row -->

      <div class="row justify-center">
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

import gameData from '../../../data/game-data'
import dialogs from '../../../globals/dialogs'
import toasts from '../../../globals/toasts'
import { localUrls } from '../../../globals/urls'

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
    game: gameData.buildGame()
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

        this.deleteGame(this.game.id)
          .then(() => {
            toasts.deleteConfirm('Game')
            this.$router.push(localUrls.gamesList)
            this.working = false
          }, err => { this.onError(err) })
      })
    },

    /** Attempts to submit the current user data to the API to login. */
    onFormSubmitted (value, event) {
      const updatedData = gameData.buildDataForUpdate(value)

      this.working = true
      this.apiError = ''

      this.updateGame(updatedData)
        .then(() => {
          toasts.updateConfirm('Game')
          this.$router.push(localUrls.gamesList)
          this.working = false
        }, err => { this.onError(err) })
    },

    /** Callback for 'cancel' button on form; simply cancel the 'editing' state. */
    onFormCancelled (value, event) {
      this.editing = false
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
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

    this.checkForStoredLogin()
      .then(() => {
        const gameId = this.$route.params.id
        if (!gameId) {
          this.$router.push(localUrls.gamesList)
        } else {
          this.findGame(gameId)
            .then(gameRes => {
              this.game = Object.assign({}, gameRes)
              this.working = false
              this.initializing = false
            }, () => {
              // if no valid instance, return to the List view
              this.$router.push(localUrls.gamesList)
              this.working = false
              this.initializing = false
            })
        }
      }, err => { this.onError(err) })
  }
}
</script>
