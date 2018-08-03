/* global describe beforeEach it */

import {expect} from 'chai'
import React from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react'
import enzyme, {shallow} from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/enzyme'
import Adapter from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
