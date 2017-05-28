<template>
<div class="card">
  <div class="card-content">
    <button
      class="full-width"
      :class="{ info: !hasToday, warning: hasToday }"
      :disabled="working"
      @click="handleClick">
      {{ hasToday ? 'Remove Today' : 'Add Today' }}
    </button>
  </div>
</div><!-- /card -->
</template>

<script>
export default {
  props: {
    working: { type: Boolean, required: true },
    hasToday: { type: Boolean, required: true },
    handleClick: { type: Function, required: true }
  }
}
</script>
