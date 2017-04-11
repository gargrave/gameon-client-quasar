<template>
  <div id="q-app">
    <q-layout>

      <div slot="header" class="toolbar">
        <app-title-bar></app-title-bar>
      </div>

      <app-left-drawer></app-left-drawer>

      <router-view></router-view>

    </q-layout>
  </div>
</template>

<script>
import LeftDrawer from './components/layout/LeftDrawer'
import TitleBar from './components/layout/TitleBar'

export default {
  components: {
    appLeftDrawer: LeftDrawer,
    appTitleBar: TitleBar
  }
}
</script>
