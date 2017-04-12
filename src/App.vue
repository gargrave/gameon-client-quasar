<template>
  <div id="q-app">
    <q-layout>

      <div slot="header" class="toolbar">
        <app-title-bar></app-title-bar>
      </div>

      <app-side-nav></app-side-nav>

      <router-view></router-view>

    </q-layout>
  </div>
</template>

<script>
import SideNav from './components/layout/SideNav'
import TitleBar from './components/layout/TitleBar'

export default {
  components: {
    appSideNav: SideNav,
    appTitleBar: TitleBar
  }
}
</script>
