/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchFlashcards, postFlashcard} from './flashcard'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {flashcards: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchFlashcards', () => {
    it('eventually dispatches the GET FLASHCARDS action', async () => {
      const fakeFlashcard = {
        question: 'What is the difference between .call and .apply?',
        answer: 'Both .call and .apply are used to invoke functions and the first parameter will be used as the value of this within the function. However, .call takes in comma-separated arguments as the next arguments while .apply takes in an array of arguments as the next argument. An easy way to remember this is C for call and comma-separated and A for apply and an array of arguments.'
      }
      mockAxios.onGet('/api/flashcards').replyOnce(200, fakeFlashcard)
      await store.dispatch(fetchFlashcards())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_FLASHCARDS')
      expect(actions[0].flashcards).to.be.deep.equal(fakeFlashcard)
    })
  })

  describe('postFlashcard', () => {
    it('eventually dispatches the POST FLASHCARD action', async () => {
      const fakeFlashcard = {
        question: 'What is the difference between .call and .apply?',
        answer: 'Both .call and .apply are used to invoke functions and the first parameter will be used as the value of this within the function. However, .call takes in comma-separated arguments as the next arguments while .apply takes in an array of arguments as the next argument. An easy way to remember this is C for call and comma-separated and A for apply and an array of arguments.'
      }
      mockAxios.onPost('/api/flashcards').replyOnce(201, fakeFlashcard)
      await store.dispatch(postFlashcard())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_FLASHCARD')
      expect(actions[0].flashcard).to.be.deep.equal(fakeFlashcard)
    })
  })
})
