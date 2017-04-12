import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import { localUrls, routes } from './globals/urls'

import AccountCreatePage from './components/auth/containers/AccountCreatePage'
import AccountDetailPage from './components/auth/containers/AccountDetailPage'
import LoginPage from './components/auth/containers/LoginPage'

import GamesListPage from './components/games/GamesListPage'

import PlatformsListPage from './components/platforms/PlatformsListPage'

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
      path: localUrls.gamesList,
      component: GamesListPage,
      name: routes.games.list
    },

    /* ============================================
     = Platforms routes
     ============================================= */
    {
      path: localUrls.platformsList,
      component: PlatformsListPage,
      name: routes.platforms.list
    },

    { path: '/', component: load('Index') }, // Default
    { path: '*', component: load('Error404') } // Not found
  ]
})
