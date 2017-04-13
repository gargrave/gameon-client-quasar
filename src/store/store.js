import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Profile from './modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Profile
  }
})
