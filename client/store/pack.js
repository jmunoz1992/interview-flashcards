import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PACKS = 'GET_PACKS'
const REMOVE_PACK = 'REMOVE_PACK'

/**
 * INITIAL STATE
 */
const defaultPacks = []

/**
 * ACTION CREATORS
 */
const getPacks = (packs) => ({type: GET_PACKS, packs})
const removePack = (pack) => ({type: REMOVE_PACK, pack})

/**
 * THUNK CREATORS
 */
export const fetchPacks = () => async dispatch => {
  try {
    const res = await axios.get('/api/packs')
    return dispatch(getPacks(res.data || defaultPacks))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function(state = defaultPacks, action) {
  switch (action.type) {
    case GET_PACKS:
      return action.packs
    case REMOVE_PACK:
      return defaultPacks
    default:
      return state
  }
}
