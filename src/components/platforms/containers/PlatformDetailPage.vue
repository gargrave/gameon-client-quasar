<template>
  <transition name="fade">
    <div class="layout-view">
      <div class="row justify-center">

        <div class="card">

          <div class="card-title bg-primary text-white">
            {{ originalModel.title }}
          </div><!-- /card-title -->

          <app-platform-edit-view
            v-if="editing"
            :working="working"
            :apiError="apiError"
            :platform="model"
            :errors="errors"
            :handleInput="handleInput"
            @onFormSubmitted="onFormSubmitted"
            @onFormCancelled="onFormCancelled">
          </app-platform-edit-view>

          <app-platform-detail-view
            v-else
            :platform="originalModel"
            @editClicked="onEditClick"
            @backClicked="onBackClick">
          </app-platform-detail-view>

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
import PlatformModel from '../../../models/platform'
import { areEqual, validate } from '../utils/platformValidator'

import PlatformDetailView from '../components/PlatformDetailView'
import PlatformEditView from '../components/PlatformEditView'

export default {
  components: {
    appPlatformDetailView: PlatformDetailView,
    appPlatformEditView: PlatformEditView
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
    model: PlatformModel.empty(),
    // the untouched copy of the original instance
    originalModel: PlatformModel.empty(),
    // local validation errors
    errors: PlatformModel.emptyValidationErrors()
  }),

  computed: {
    isWorking () {
      return this.working || this.editingPlatformsAjaxPending
    },

    ...mapGetters([
      'platformsAjaxPending'
    ])
  },

  methods: {
    handleInput (e) {
      let key = e.target.name
      if (key in this.model) {
        this.model[key] = e.target.value
      }
    },

    /** Callback for clicking the 'edit' button; simply change to 'editing' state. */
    onEditClick () {
      this.model = cloneDeep(this.originalModel)
      this.editing = true
    },

    /** Callback for clicking the 'back' button; simply return to list page. */
    onBackClick () {
      this.$router.push(localUrls.platformsList)
    },

    /** Callback for clicking the 'delete' button; send a request to delete this object. */
    onDeleteClick () {
      dialogs.confirmDelete('Platform', () => {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Deleting Platform...' })

        this.deletePlatform(this.model.id)
          .then(() => {
            toasts.deleteConfirm('Platform')
            this.$router.push(localUrls.platformsList)
            this.working = false
            Loading.hide()
          }, err => { this.onError(err) })
      })
    },

    /** Attempts to submit the current user data to the API to login. */
    onFormSubmitted (value, event) {
      const platform = PlatformModel.toAPI(this.model)
      const hasChanges = !areEqual(platform, this.originalModel)
      const { errors, valid } = validate(platform)

      if (valid && hasChanges) {
        this.working = true
        this.apiError = ''
        Loading.show({ message: 'Saving Platform...' })

        this.updatePlatform(platform)
          .then(() => {
            toasts.updateConfirm('Platform')
            this.$router.push(localUrls.platformsList)
            this.working = false
            Loading.hide()
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
      'findPlatform',
      'updatePlatform',
      'deletePlatform'
    ])
  },

  created () {
    this.working = true
    Loading.show({ message: 'Loading...' })

    this.checkForStoredLogin()
      .then(() => {
        const platformId = this.$route.params.id
        if (!platformId) {
          this.$router.push(localUrls.platformsList)
        } else {
          this.findPlatform(platformId)
            .then(platformRes => {
              this.model = cloneDeep(platformRes)
              this.originalModel = cloneDeep(platformRes)
              this.working = false
              this.initializing = false
              Loading.hide()
            }, () => {
              // if no valid instance, return to the List view
              this.$router.push(localUrls.platformsList)
            })
        }
      }, err => { this.onError(err) })
  }
}
</script>
