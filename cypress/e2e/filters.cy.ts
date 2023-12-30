/// <reference types="Cypress" />

describe("filtering the jobs", () => {
  beforeEach(() => {
    cy.visit("/jobs");
    cy.fetchJobs();
  });

  //test the search by job title=randomTitle
  it("should filter the jobs by title", () => {
    cy.get('[data-cy="jobs-title-filter"]').type("randomTitle");
    cy.get('[data-cy="job-item"]').should("have.length", 0);
  });

  //Filter by job type
  it("should filter the jobs by type", () => {
    cy.filterJobs("jobs-types-filter", "Remote");
  });

  //Filter by company
  it("should filter the jobs by company", () => {
    cy.filterJobs("jobs-companies-filter", 1);
  });
});
