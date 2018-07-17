import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FLASHCARDS = 'GET_FLASHCARDS'
const REMOVE_FLASHCARD = 'REMOVE_FLASHCARD'
const ADD_FLASHCARD = 'ADD_FLASHCARD'

/**
 * INITIAL STATE
 */
const defaultFlashcards = []

/**
 * ACTION CREATORS
 */
const getFlashcards = (flashcards) => ({
  type: GET_FLASHCARDS,
  flashcards
})

const removeFlashcard = (flashcard) => ({
  type: REMOVE_FLASHCARD,
  flashcard
})

const addFlashcard = (flashcard) => ({
  type: ADD_FLASHCARD,
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
    const res = await axios.delete(`/api/flashcards/${flashcard.id}`)
    dispatch(removeFlashcard(flashcard))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultFlashcards, action) {
  switch (action.type) {
    case ADD_FLASHCARD:
      return [...state, action.flashcard]
    case GET_FLASHCARDS:
      return action.flashcards
    case REMOVE_FLASHCARD:
      const flashcard_to_delete_id = action.flashcard.id;
      let new_flashcards = state.slice();
      return new_flashcards.filter(flashcard => flashcard.id !== flashcard_to_delete_id)
    default:
      return state
  }
}
