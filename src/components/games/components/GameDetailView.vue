<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ game.title }}</p>
    <p><strong>Platform:</strong> {{ game.platform.title }}</p>
    <hr>
    <p><strong>Played:</strong> {{ playCountString }}</p>
    <p><strong>Last Played:</strong> {{ lastPlayedString }}</p>
    <hr>
    <p><strong>Added on:</strong> {{ addedOnString }}</p>
    <p><strong>Updated on:</strong> {{ updatedOnString }}</p>

    <hr>
    <button
      class="primary"
      @click="$emit('editClicked')">
      Edit
    </button>

    <button
      class="secondary pull-right"
      @click="$emit('backClicked')">
      Back
    </button>
  </div><!-- /card-content -->
</template>

<script>
import dateHelper from '../../../utils/dateHelper'

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },

  computed: {
    playCountString () {
      if (this.game.dates.length === 0) {
        return 'Never'
      } else {
        const len = this.game.dates.length
        return `${len} times`
      }
    },

    lastPlayedString () {
      return dateHelper.timeAgoString(this.game.lastPlayed)
    },

    addedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.game.created)
    },

    updatedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.game.modified)
    }
  },

  created () {
    console.log('this.game:')
    console.log(this.game)
  }
}
</script>
