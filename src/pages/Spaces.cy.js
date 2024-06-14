import React from 'react'
import Spaces from './Spaces'

describe('<Spaces />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Spaces />)
  })
})