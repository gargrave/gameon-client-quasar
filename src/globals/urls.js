import env from './env'

const DEV_API_ROOT_URL = 'http://localhost:3030'
const STAGING_API_ROOT_URL = ''
const PROD_API_ROOT_URL = ''

let apiRoot
let restApiRoot;

(function setUrls () {
  if (env.isProd()) {
    apiRoot = PROD_API_ROOT_URL
    restApiRoot = `${apiRoot}/api/v1`
  } else if (env.isStaging()) {
    apiRoot = STAGING_API_ROOT_URL
    restApiRoot = `${apiRoot}/api/v1`
  } else {
    apiRoot = DEV_API_ROOT_URL
    restApiRoot = `${apiRoot}/api/v1`
  }
})()

// named constants for local routes
export let routes = {
  auth: {
    login: 'auth-login',
    create: 'auth-create',
    detail: 'auth-detail'
  },
  games: {
    list: 'games-list',
    create: 'game-create',
    detail: 'game-detail'
  },
  platforms: {
    list: 'platforms-list',
    create: 'platform-create',
    detail: 'platform-detail'
  }
}

// URLs for AJAX calls to the API
export let apiUrls = {
  login: `${apiRoot}/auth/local/`,
  logout: `${apiRoot}/auth/logout/`,
  user: `${apiRoot}/users/`,
  profiles: `${restApiRoot}/profiles/`,
  games: `${restApiRoot}/games/`,
  platforms: `${restApiRoot}/platforms/`
}

// URLs for local routing (i.e. vue-router)
export let localUrls = {
  // auth URLs
  account: '/account',
  accountCreate: '/account/new',
  login: '/account/login',
  // Games URLs
  gamesList: '/games',
  gameCreate: '/games/new',
  gameDetail: '/games/:id',
  // Platforms URLs
  platformsList: '/platforms',
  platformCreate: '/platforms/new',
  platformDetail: '/platforms/:id'
}
