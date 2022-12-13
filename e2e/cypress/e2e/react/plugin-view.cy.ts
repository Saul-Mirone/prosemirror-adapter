/* Copyright 2021, Prosemirror Adapter by Mirone. */

Cypress.config('baseUrl', `http://localhost:${Cypress.env('SERVER_PORT')}`)

beforeEach(() => {
  cy.visit('/react/')
})

it('Size plugin view render', () => {
  cy.get('.editor')
    .get('[data-test-id="size-view-plugin"]')
    .contains('Size for document: 523')

  cy.get('.editor').type('OK')

  cy.get('.editor')
    .get('[data-test-id="size-view-plugin"]')
    .contains('Size for document: 525')

  cy.get('.editor').type('{backspace}')

  cy.get('.editor')
    .get('[data-test-id="size-view-plugin"]')
    .contains('Size for document: 524')
})
