<template>
  <div class="toolbar">
    <button
      class="hide-on-drawer-visible"
      @click="$emit('toggleDrawer')"
    >
      <i>menu</i>
    </button>

    <q-toolbar-title :padding="0" class="toolbar-title">
      GameOn
    </q-toolbar-title>
  </div>
</template>

<script>
export default {
}
</script>
