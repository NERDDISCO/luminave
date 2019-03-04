export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE'
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const navigate = (location) => (dispatch) => {
  const pathname = location.pathname
  const parts = pathname.slice(1).split('/')
  const page = parts[0] || 'general'
  const entityId = parts[1] || undefined

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page, entityId))

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false))
}

const loadPage = (page, entityId) => (dispatch) => {
  switch(page) {
    case 'general':
      import('../views/general-view.js')
      break

    case 'animation':
      import('../views/animation-view.js')
      break

    case 'fixture': {
      if (entityId !== undefined) {
        import('../views/fixture-detail-view.js')
      } else {
        import('../views/fixture-view.js')
      }
      break
    }

    case 'venue': {
      if (entityId !== undefined) {
        import('../views/venue-detail-view.js')
      } else {
        import('../views/venue-view.js')
      }
      break
    }

    case 'universe':
      import('../views/universe-view.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      })
      break

    case 'midi':
      import('../views/midi-view.js')
      break

    case 'scene':
      import('../views/scene-view.js')
      break

    case 'view404':
      import('../views/my-view404.js')
      break

    default:
      page = 'view404'
      import('../views/my-view404.js')
  }
  
  dispatch(updatePage(page, entityId))
}

const updatePage = (page, entityId) => {
  return {
    type: UPDATE_PAGE,
    page,
    entityId
  }
}

let snackbarTimer

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  })
  clearTimeout(snackbarTimer)
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000)
}

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar())
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  })
}

export const updateLayout = (wide) => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false))
  }
}

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    })
  }
}
