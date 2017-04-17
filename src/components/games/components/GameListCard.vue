<template>
  <div
    class="card cursor list-view-card"
    @click="$emit('click', { id: game.id })">

    <div class="card-content">
      <h6>{{ game.title }}</h6>
    </div><!-- /card-content -->

  </div><!-- /card -->
</template>

<script>
export default {
  props: {
    // the Game object for this instance
    game: {
      type: Object,
      required: true
    }
  }
}
</script>
