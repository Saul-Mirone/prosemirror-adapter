Cypress.config('baseUrl', `http://localhost:${Cypress.env('SERVER_PORT')}`)

beforeEach(() => {
  cy.visit('/react/')
})

it('heading node view render', () => {
  cy.get('.editor')
    .get('[data-node-view-root="true"]')
    .get('h3')
    .get('[data-node-view-content="true"]')
    .contains('Hello ProseMirror')
})

it('paragraph node view render', () => {
  cy.get('.editor')
    .get('blockquote')
    .get('[data-node-view-root="true"]')
    .get('p')
    .get('[data-node-view-content="true"]')
    .contains('This is editable text')
})

it('heading node view update', () => {
  const isMac = Cypress.platform === 'darwin'

  const key = isMac ? '{cmd+[}' : '{ctrl+[}'

  cy.get('.editor').type(`{selectAll}{leftArrow}${key}`, { delay: 500 })
  cy.get('.editor').get('[data-node-view-root="true"]').get('h4').should('exist')

  cy.get('.editor').type(`{selectAll}{leftArrow}${key}`, { delay: 500 })
  cy.get('.editor').get('[data-node-view-root="true"]').get('h5').should('exist')
})
