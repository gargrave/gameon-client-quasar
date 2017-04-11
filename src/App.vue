<template>
  <div id="q-app">
    <q-layout>

      <div slot="header" class="toolbar">
        <app-title-bar></app-title-bar>
      </div>

      <router-view></router-view>

    </q-layout>
  </div>
</template>

<script>
import TitleBar from './components/layout/TitleBar'

export default {
  components: {
    appTitleBar: TitleBar
  }
}
</script>
