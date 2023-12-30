/// <reference types="Cypress" />

describe("Test Navigation", () => {
  it("should navigate between pages", () => {
    cy.visit("/");
    cy.get('[data-cy="nav-home-link"]').click();
    cy.location("pathname").should("eq", "/");
    cy.get('[data-cy="nav-jobs-link"]').click();
    cy.location("pathname").should("eq", "/jobs");
    cy.get('[data-cy="nav-auth-link"]').click();
    cy.location("pathname").should("eq", "/auth");
  });
});
