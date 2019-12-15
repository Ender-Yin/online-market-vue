const apiURL = "https://online-market-api-staging.herokuapp.com/invoices/";

describe("Manage Invoices page", () => {
  beforeEach( ()=>{
    cy.visit("/")
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(3)
      .click();
  })

  describe("leave a message", () => {
    it("watch the message appears at correct place", () => {
      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(3)
        .click();

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(5)
        .find("a")
        .click();

      cy.get("table")
        .contains("iphone8").should("exist")

      cy.get("input[data-test=message]").type("good quality");

      cy.get("button[type=submit]").click();
      //load page
      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(3)
        .click();

      cy.get("tbody")
        .find("tr")
        .should("have.length", 1);
      //load page
      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(3)
        .click();

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(4)
        .contains("good quality").should("exist")

    });
  });
});
