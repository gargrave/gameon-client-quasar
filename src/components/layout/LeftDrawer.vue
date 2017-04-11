<template>
  <q-drawer ref="drawer">
    <div class="list platform-delimiter">
      <div class="item drawer-closer" exact="">
        <i class="item-primary">view_quilt</i>
        <div class="item-content">
          GameOn
        </div>
      </div>
      <hr>

      <div class="list-label">Navigation</div>
      <q-drawer-link icon="games" to="/games">My Games</q-drawer-link>
      <q-drawer-link icon="radio" to="/platforms">My Platforms</q-drawer-link>
    </div>
  </q-drawer>
</template>

<script>
export default {
}
</script>
