declare namespace Cypress {
  interface Chainable {
    fetchJobs(): Chainable<number | string | unknown>;
    filterJobs(
      filterType: string,
      filterValue: string | number
    ): Chainable<number | string | unknown>;
  }
}
