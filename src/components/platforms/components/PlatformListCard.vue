<template>
  <div
    class="card cursor list-view-card"
    @click="$emit('click', { id: platform.id })">

    <div class="card-content">
      <h6>{{ platform.title }}</h6>
    </div><!-- /card-content -->

  </div><!-- /card -->
</template>

<script>
export default {
  props: {
    // the Platform object for this instance
    platform: {
      type: Object,
      required: true
    }
  }
}
</script>
