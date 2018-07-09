/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchPacks} from './pack'
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

  describe('fetchPacks', () => {
    it('eventually dispatches the GET PACKS action', async () => {
      const fakePack = {
        name: 'frontend'
      }
      mockAxios.onGet('/api/packs').replyOnce(200, fakePack)
      await store.dispatch(fetchPacks())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PACKS')
      expect(actions[0].packs).to.be.deep.equal(fakePack)
    })
  })
})
