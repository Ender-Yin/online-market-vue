const apiURL = "https://online-market-api-staging.herokuapp.com/things/";

describe("Put a thing page", () => {
  beforeEach(() => {
    // Delete all invoices in the API's datastore
    cy.request(apiURL)
      .its("body")
      .then(things => {
        things.forEach(element => {
          cy.request("DELETE", `${apiURL}${element._id}`);
        });
      });
    // Populate API's datastore
    cy.fixture("things").then(things => {
      let [d1, d2, d3, d4, ...rest] = things;
      let four = [d1, d2, d3, d4];
      four.forEach(things => {
        cy.request("POST", apiURL, things);
      });
    });
    cy.visit("/");
    // Click Donate navbar link
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(2)
      .click();
  });
  describe("Put a thing", () => {
    describe("With valid attributes", () => {
      it("allows your thing to be put", () => {
        //  Fill out web form
        cy.get("input[data-test=name]").type("nokia");
        cy.get("input[data-test=price]").type(321);
        cy.get("label")
          .contains("Your user name")
          .next()
          .type("Ender");
        cy.contains("Successfully !!!").should("not.exist");
        cy.get(".error").should("not.exist");
        cy.get("button[type=submit]").click();
        cy.contains("Successfully !!!").should("exist");
      });
      after(() => {
        cy.get("a")
          .contains("See more product here")
          .click();
        cy.get("tbody")
           .find("tr")
           .should("have.length", 5);
      });
    });
    describe("With invalid/blank attributes for each input", () => {
      it("shows error messages until all attributes are valid", () => {
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Product name");
        cy.get(".error").contains("Price");
        cy.get(".error").contains("Your name");
        cy.get("input[data-test=name]").type("ipad");
        cy.get(".error")
          .contains("Product name")
          .should("not.exist");
        cy.get("label")
          .contains("Price")
          .next()
          .type(200);
        cy.get("input[data-test=seller]").type("ender");
        cy.get(".error").should("not.exist");
      });
      after(() => {
        cy.get("a")
          .contains("See more product here")
          .click();
        // cy.get("tbody")
        //   .find("tr")
        //   .should("have.length", 5);
      });
    });
  });
});
