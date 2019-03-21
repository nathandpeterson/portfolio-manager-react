import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('app', () => {
  it('loads without crashing', () => {
    const el = shallow(<App />)
    expect(el).toBeTruthy()
  })
})