<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ game.title }}</p>
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
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  }
}
</script>
