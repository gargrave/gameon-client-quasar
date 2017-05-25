<template>
  <div
    class="card cursor list-view-card"
    @click="$emit('click', { id: game.id })">

    <div class="card-content">
      <div class="row justify-between">

        <div class="column justify-center">
          <h6 class="list-view-card-title">{{ game.title }}</h6>
          <p class="text-tertiary">
            <small>Last played: {{ game.lastPlayed || 'Never' }}</small>
          </p>
        </div><!-- /column -->

        <div class="column justify-center">
          <span class="label bg-faded text-white ">{{ game.dates.length }}</span>
        </div><!-- /column -->

      </div><!-- /row -->
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
