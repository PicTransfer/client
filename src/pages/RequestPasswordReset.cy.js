import React from 'react'
import RequestPasswordReset from './RequestPasswordReset'

describe('<RequestPasswordReset />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RequestPasswordReset />)
  })
})