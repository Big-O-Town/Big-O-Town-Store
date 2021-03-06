import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
// const REMOVE_USER = 'REMOVE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
// const removeUser = () => ({ type: REMOVE_USER })
/**
 * THUNK CREATORS
 */

export const createGuestSession = () => async dispatch => {
  try {
    // if there's NO old guest session, we have to make a new one, and set it in local storage
    // to the new customer's browser. Local storage has no expiry date, unless we make one for it
    const newGuest = (await axios.post('/auth/guest/new')).data
    if (newGuest.id) {
      window.localStorage.setItem('guestID', newGuest.id)
      return dispatch(getUser(newGuest))
    } else if (newGuest.user) {
      return dispatch(getUser(newGuest))
    }
  } catch (err) {
    console.log(err)
  }
}

export const retrieveGuestSession = guestID => async dispatch => {
  try {
    // guestID parameter comes from localStorage in the frontend component
    // if that user has already been a guest before, we get that guest back
    const guest = (await axios.post(`/auth/guest/retrieve`, {guestID: guestID}))
      .data
    return dispatch(getUser(guest))
  } catch (ex) {
    console.log(ex)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let user
  try {
    // set the guest ID in localStorage here for retrieval later if the user logs out or session expires
    const guest = (await axios.get('/auth/me')).data
    if (!guest.email) {
      //Defensiveness to make sure it's a guest
      window.localStorage.setItem('guestID', guest.id)
    }

    user = (await axios.post(`/auth/${method}`, {email, password})).data
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(user))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    const guest = (await axios.post('/auth/guest/retrieve', {
      guestID: window.localStorage.getItem('guestID')
    })).data
    dispatch(getUser(guest))
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async dispatch => {
  let res
  try {
    res = await axios.get('/auth/me')
    //console.log('getting me', res.data)
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const updateUserAddress = data => async dispatch => {
  try {
    console.log('UPDATING')
    const updatedUser = (await axios.post('/api/users/update/address', data))
      .data
    return dispatch(getUser(updatedUser))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      state = action.user
      return state
    default:
      return state
  }
}
