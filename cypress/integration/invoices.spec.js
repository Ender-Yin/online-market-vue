//const apiURL = "https://online-market-api-staging.herokuapp.com/invoices/";
const apiURL = "http://localhost:3000/invoices/";

describe("Manage Invoices page", () => {
  beforeEach( ()=>{
    // visit
    cy.visit("/")
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(3)
      .click();
  })

  describe("Manage invoices", () => {
    it("view all invoices and cant do any thing", () => {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 1);

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(5)
        .should('not.exist')
    });
  });
});
