<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ game.title }}</p>
    <p><strong>Last Played:</strong> {{ lastPlayedString }}</p>
    <p><strong>Added on:</strong> {{ game.created }}</p>

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
    lastPlayedString () {
      return dateHelper.timeAgoString(this.game.lastPlayed)
    }
  }
}
</script>
