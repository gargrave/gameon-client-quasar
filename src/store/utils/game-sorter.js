// valid sorting options
export const SORT = {
  TITLE: 'title',
  CREATED: 'created',
  MODIFIED: 'modified'
}

export const SORT_LABELS = {
  TITLE: 'Title',
  CREATED: 'Date Created',
  MODIFIED: 'Date Modified'
}

export const DEFAULT_SORT = SORT.CREATED

export default {
  sort (games, sortBy, asc = true) {
    // ensure the games' dates lists are sorted
    // and add a property for the latest date
    games.forEach((game) => {
      game.dates = game.dates.sort().reverse()
      game.lastPlayed = game.dates[0]
    })

    // sort the full games list by the most recent date
    games = games.sort((a, b) => {
      const dateA = a.lastPlayed || '2000-01-01'
      const dateB = b.lastPlayed || '2000-01-01'
      return dateA < dateB ? 1 : -1
    })

    return games
  }
}
