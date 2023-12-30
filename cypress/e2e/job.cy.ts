/// <reference types="Cypress" />

describe("Single Job Page", () => {
  const supabaseApiKey = Cypress.env("VITE_SERVICE_KEY");
  const jobId = 1;

  const singleJobEndpoint = `${Cypress.env(
    "VITE_URL"
  )}/rest/v1/jobs?select=id%2Ccompany_id%2Ctitle%2Cdescription%2Csalary%2Ctype%2Ccompanies%28id%2Cname%2Cmanager%2Clocation%29&id=eq.${jobId}`;

  it("should load the details of a single job from the server", () => {
    cy.visit(`/jobs/${jobId}`);
    cy.get('[data-cy="job-details-spinner"]').should("be.visible");

    cy.get('[data-cy="job-title"]').should("not.exist");
    cy.get('[data-cy="job-description"]').should("not.exist");

    cy.request({
      method: "GET",
      url: singleJobEndpoint,
      headers: {
        apikey: supabaseApiKey,
      },
    }).then((response) => {
      const jobDetails = response.body[0];

      cy.get('[data-cy="job-details-spinner"]').should("not.exist");

      cy.get('[data-cy="job-title"]')
        .should("exist")
        .and(
          "have.text",
          `${jobDetails.title} position at ${jobDetails.companies.name}`
        );

      cy.get('[data-cy="job-description"]')
        .should("exist")
        .and("have.text", jobDetails.description);
    });
  });
});
