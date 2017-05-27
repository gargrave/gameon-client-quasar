<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ platform.title }}</p>
    <p><strong>Added on:</strong> {{ platform.created }}</p>

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
     // the Platform object being viewed
    platform: { type: Object, required: true }
  }
}
</script>
