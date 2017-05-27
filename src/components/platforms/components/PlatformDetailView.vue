<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ platform.title }}</p>

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
     // the Platform object being viewed
    platform: { type: Object, required: true }
  },

  computed: {
    addedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.platform.created)
    },

    updatedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.platform.modified)
    }
  }
}
</script>
