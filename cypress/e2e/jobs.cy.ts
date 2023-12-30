/// <reference types="Cypress" />

describe("Jobs List page", () => {
  beforeEach(() => {
    cy.visit("/jobs");
  });

  const supabaseApiKey = Cypress.env("VITE_SERVICE_KEY");

  const companiesEndpoint = `${Cypress.env("VITE_URL")}/rest/v1/companies?*`;

  it("should load the jobs from the server", () => {
    cy.fetchJobs();
  });

  it("should load the companies from the server and enable the companies filter input", () => {
    cy.get('[data-cy="jobs-companies-filter"]').should("not.exist");
    cy.request({
      method: "GET",
      url: companiesEndpoint,
      headers: {
        apikey: supabaseApiKey,
      },
    }).then((response) => {
      const { length } = response.body;

      expect(length).to.be.greaterThan(0);

      cy.get('[data-cy="jobs-companies-filter"]')
        .should("exist")
        .and("not.be.disabled");
    });
  });
});
