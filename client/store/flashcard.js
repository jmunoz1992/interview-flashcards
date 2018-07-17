import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FLASHCARDS = 'GET_FLASHCARDS'
const ADD_FLASHCARD = 'ADD_FLASHCARD'
const REMOVE_FLASHCARD = 'REMOVE_FLASHCARD'
const UPDATE_FLASHCARD = 'UPDATE_FLASHCARD'

/**
 * ACTION CREATORS
 */
const getFlashcards = (flashcards) => ({
  type: GET_FLASHCARDS,
  flashcards
})

const addFlashcard = (flashcard) => ({
  type: ADD_FLASHCARD,
  flashcard
})

const removeFlashcard = (flashcard) => ({
  type: REMOVE_FLASHCARD,
  flashcard
})

const updateFlashcard = (flashcard) => ({
  type: UPDATE_FLASHCARD,
  flashcard
})

/**
 * THUNK CREATORS
 */
export const fetchFlashcards = () => async dispatch => {
  try {
    const res = await axios.get('/api/flashcards')
    dispatch(getFlashcards(res.data || defaultFlashcards))
  } catch (err) {
    console.error(err)
  }
}

export const postFlashcard = (flashcard) => async dispatch => {
  try {
    const res = await axios.post('/api/flashcards', flashcard)
    dispatch(addFlashcard(res.data || defaultFlashcards))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFlashcard = (flashcard) => async dispatch => {
  try {
    await axios.delete(`/api/flashcards/${flashcard.id}`)
    dispatch(removeFlashcard(flashcard))
  } catch (err) {
    console.error(err)
  }
}

export const updateThisFlashcard = (flashcard) => async dispatch => {
  try {
    console.log('update this flashcard dispatch ', flashcard)
    const res = await axios.put(`/api/flashcards/${flashcard.id}`, flashcard)
    dispatch(updateFlashcard(res.data || defaultFlashcards))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultFlashcards = []

/**
 * REDUCER
 */
export default function(state = defaultFlashcards, action) {
  switch (action.type) {
    case GET_FLASHCARDS:
      return action.flashcards
    case ADD_FLASHCARD:
      return [...state, action.flashcard]
    case REMOVE_FLASHCARD:
      const flashcard_to_delete_id = action.flashcard.id;
      let new_flashcards = state.slice();
      return new_flashcards.filter(flashcard => flashcard.id !== flashcard_to_delete_id)
    case UPDATE_FLASHCARD:
      const flashcard_to_update = action.flashcard;
      let updated_flashcards = state.slice();
      return updated_flashcards.map(flashcard => {
        if(flashcard.id === flashcard_to_update.id) {
          return flashcard_to_update
        } else {
          return flashcard
        }
      })
    default:
      return state
  }
}
