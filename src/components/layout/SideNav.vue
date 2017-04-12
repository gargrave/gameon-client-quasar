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
      <q-drawer-link icon="games" :to="{ name: routes.games.list }">My Games</q-drawer-link>
      <q-drawer-link icon="radio" :to="{ name: routes.platforms.list }">My Platforms</q-drawer-link>

      <hr>
      <div class="list-label">Account</div>
      <q-drawer-link icon="radio" :to="{ name: routes.auth.detail }">My Account</q-drawer-link>

    </div>
  </q-drawer>
</template>

<script>
import { routes } from '../../globals/urls'

export default {
  data () {
    return {
      routes // expose to template
    }
  }
}
</script>
