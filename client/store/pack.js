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
const getPacks = (packs) => ({
  type: GET_PACKS,
  packs
})
const removePack = (pack) => ({
  type: REMOVE_PACK,
  pack
})

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

export const deletePack = (pack) => async dispatch => {
  try {
    await axios.delete(`/api/packs/${pack.id}`)
    dispatch(removePack(pack))
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
      const pack_to_delete_id = action.pack.id;
      let new_packs = state.slice();
      return new_packs.filter(pack => pack.id !== pack_to_delete_id)
    default:
      return state
  }
}
