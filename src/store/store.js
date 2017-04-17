import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Profile from './modules/profile'
import Platforms from './modules/platforms'
import Games from './modules/games'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Profile,
    Platforms,
    Games
  }
})
