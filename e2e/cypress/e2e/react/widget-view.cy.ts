/* Copyright 2021, Prosemirror Adapter by Mirone. */

Cypress.config('baseUrl', `http://localhost:${Cypress.env('SERVER_PORT')}`)

beforeEach(() => {
  cy.visit('/react/')
})

it('Focus heading to render widget', () => {
  cy.get('.editor')
    .find('h3')
    .click()

  cy.get('i[data-widget-view-root="true"]')
    .contains('###')

  cy.get('.editor').click()

  cy.get('i[data-widget-view-root="true"]').should('not.exist')

  cy.get('.editor')
    .find('h3')
    .type('{enter}# Heading 1')

  cy.get('i[data-widget-view-root="true"]')
    .contains('#')
})
