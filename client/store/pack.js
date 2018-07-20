import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PACKS = 'GET_PACKS'
const ADD_PACK = 'ADD_PACK'
const REMOVE_PACK = 'REMOVE_PACK'
const UPDATE_PACK = 'UPDATE_PACK'


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

const addPack = (pack) => ({
  type: ADD_PACK,
  pack
})

const removePack = (pack) => ({
  type: REMOVE_PACK,
  pack
})

const updatePack = (pack) => ({
  type: UPDATE_PACK,
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

export const postPack = (pack) => async dispatch => {
  try {
    const res = await axios.post('/api/packs', pack)
    dispatch(addPack(res.data || defaultPacks))
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

export const editPack = (pack) => async dispatch => {
  try {
    const res = await axios.put(`/api/packs/${pack.id}`, pack)
    dispatch(updatePack(res.data || defaultPacks))
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
    case ADD_PACK:
      return [...state, action.pack]
    case REMOVE_PACK:
      const pack_to_delete_id = action.pack.id;
      let new_packs = state.slice();
      return new_packs.filter(pack => pack.id !== pack_to_delete_id)
    case UPDATE_PACK:
      const pack_to_update = action.pack;
      let updated_packs = state.slice();
      return updated_packs.map(pack => {
        if(pack.id === pack_to_update.id) {
          return pack_to_update
        } else {
          return pack
        }
      })
    default:
      return state
  }
}
