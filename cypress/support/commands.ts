/// <reference types="cypress" />
// ***********************************************
Cypress.Commands.add("fetchJobs", () => {
  const supabaseApiKey = Cypress.env("VITE_SERVICE_KEY");

  const jobsEndpoint = `${Cypress.env("VITE_URL")}/rest/v1/jobs?*`;

  cy.get('[data-cy="jobs-spinner"]').should("be.visible");

  cy.request({
    method: "GET",
    url: jobsEndpoint,
    headers: {
      apikey: supabaseApiKey,
    },
  }).then((response) => {
    const { length } = response.body;

    cy.get('[data-cy="jobs-spinner"]').should("not.exist");
    cy.get('[data-cy="jobs-companies-filter"]')
      .should("exist")
      .and("be.disabled");
    cy.get('[data-cy="jobs-types-filter"]');
    cy.get('[data-cy="jobs-title-filter"]');
    cy.get('[data-cy="job-item"]').should("have.length", length);
  });
});

Cypress.Commands.add("filterJobs", (filterType, filterValue) => {
  cy.get(`[data-cy="${filterType}"]`).select(filterValue);
  cy.get('[data-cy="job-item"]').should("have.length.greaterThan", 0);
});
