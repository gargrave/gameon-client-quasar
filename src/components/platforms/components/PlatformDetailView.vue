<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ platform.title }}</p>
    <p><strong>Added on:</strong> {{ platform.createdAt }}</p>

    <hr>
    <button
      class="outline primary"
      @click="$emit('editClicked')">
      Edit
    </button>
  </div><!-- /card-content -->
</template>

<script>
export default {
  props: {
    platform: {
      type: Object,
      required: true
    }
  }
}
</script>
