import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import { localUrls, routes } from './globals/urls'

import AccountCreatePage from './components/auth/containers/AccountCreatePage'
import AccountDetailPage from './components/auth/containers/AccountDetailPage'
import LoginPage from './components/auth/containers/LoginPage'

import GameDetailPage from './components/games/containers/GameDetailPage'
import GamesListPage from './components/games/containers/GamesListPage'

import PlatformCreatePage from './components/platforms/containers/PlatformCreatePage'
import PlatformDetailPage from './components/platforms/containers/PlatformDetailPage'
import PlatformsListPage from './components/platforms/containers/PlatformsListPage'

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    /* ============================================
     = Auth routes
     ============================================= */
    {
      path: localUrls.login,
      component: LoginPage,
      name: routes.auth.login
    },
    {
      path: localUrls.account,
      component: AccountDetailPage,
      name: routes.auth.detail
    },
    {
      path: localUrls.accountCreate,
      component: AccountCreatePage,
      name: routes.auth.create
    },

    /* ============================================
     = Games routes
     ============================================= */
    {
      path: localUrls.gameDetail,
      component: GameDetailPage,
      name: routes.games.detail
    },
    {
      path: localUrls.gamesList,
      component: GamesListPage,
      name: routes.games.list
    },

    /* ============================================
     = Platforms routes
     ============================================= */
    {
      path: localUrls.platformCreate,
      component: PlatformCreatePage,
      name: routes.platforms.create
    },
    {
      path: localUrls.platformDetail,
      component: PlatformDetailPage,
      name: routes.platforms.detail
    },
    {
      path: localUrls.platformsList,
      component: PlatformsListPage,
      name: routes.platforms.list
    },

    { path: '/', component: load('Index') }, // Default
    { path: '*', component: load('Error404') } // Not found
  ]
})
