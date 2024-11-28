Cypress.config('baseUrl', `http://localhost:${Cypress.env('SERVER_PORT')}`)

beforeEach(() => {
  cy.visit('/react/')
})

it('link mark view render', () => {
  cy.get('.editor')
    .get('[data-mark-view-root="true"]')
    .get('a')
    .get('[data-mark-view-content="true"]')
    .contains('links')
})

it('link mark view update', () => {
  cy.get('.editor')
    .get('[data-mark-view-root="true"]')
    .contains('hover count: 0')

  cy.get('.editor')
    .get('[data-mark-view-root="true"]')
    .trigger('pointerenter')
    .contains('hover count: 1')

  cy.get('.editor')
    .get('[data-mark-view-root="true"]')
    .trigger('pointerleave')
    .trigger('pointerenter')
    .contains('hover count: 2')
})
