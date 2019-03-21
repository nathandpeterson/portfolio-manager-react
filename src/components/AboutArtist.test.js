import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

import AboutArtist from './AboutArtist'
import Nav from './Nav'

describe('about artist', () => {
  it('renders without crashing', () => {
    const el = shallow(<AboutArtist store={mockStore({runtime:{}})} />)
    expect(el.length).toBe(1)
  })
})