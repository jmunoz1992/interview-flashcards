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
const getFlashcards = (flashcards) => ({type: GET_FLASHCARDS, flashcards})
const removeFlashcard = () => ({type: REMOVE_USER})
const addFlashcard = (flashcard) => ({type: ADD_FLASHCARD, flashcard})

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

export const postFlashcard = () => async dispatch => {
  try {
    const res = await axios.post('/api/flashcards')
    dispatch(addFlashcard(res.data || defaultFlashcards))
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
      return defaultFlashcards
    default:
      return state
  }
}
