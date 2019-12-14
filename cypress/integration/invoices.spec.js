const apiURL = "http://localhost:3000/invoices/";

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
      cy.get("tbody")
        .find("tr")
        .eq(1)
        .find("td")
        .eq(5)
        .find("a")
        .click();

      cy.get("table")
        .contains("IPHONE100").should("exist")

      cy.get("input[data-test=message]").type("good quality");

      cy.get("button[type=submit]").click();

      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(3)
        .click();

      cy.get("tbody")
        .find("tr")
        .eq(1)
        .find("td")
        .eq(4)
        .contains("good quality").should("exist")

    });
  });
});
