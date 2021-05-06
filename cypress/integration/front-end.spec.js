describe('Login screen', () => {
  it('Clicking login should change button to show arrow, clicking second time changes to show "Log In"', () => {
    cy.visit('http://localhost:19006/');
    cy.get('[data-testid="arrow-icon"]').should('not.exist');
    cy.contains('Log In')
      .click()
      // Arrow should appear
      .get('[data-testid="arrow-icon"]')
      // "Log In" text should disappear
      .contains('Log In').should('not.exist');
      cy.get('[data-testid="arrow-icon"]')
      .click()
      // Arrow should disappear
      .get('[data-testid="arrow-icon"]').should('not.exist')
      // "Log In" text should appear
      cy.contains('Log In');
  });
  it('Can type into username and password fields', () => {
    cy.visit('http://localhost:19006/');
    cy.get('[placeholder="Username"]')
      .type('Hello')
      .should('have.value','Hello');
      cy.get('[placeholder="Password"]')
      .type('World')
      .should('have.value','World');
  })
});