//const apiURL = "https://online-market-api-staging.herokuapp.com/invoices/";
const apiURL = "http://localhost:3000/things/";

describe("Manage Invoices page", () => {
  beforeEach( ()=>{
    //to login
    cy.visit("/");
    // Click login navbar link
    cy.get(".navbar-nav")
      .eq(1)
      .find(".nav-item")
      .eq(2)
      .click();
    // input username and password
    cy.get("#username").type("ender")
    cy.get("#pwd").type("123")

    cy.get("button").contains("LOG IN").click()
    // do it again
    cy.get("#username").type("ender")
    cy.get("#pwd").type("123")

    cy.get("button").contains("LOG IN").click()
    // go to my invoice page
    cy.get(".btn").contains("view my invoices").click()
  })

  describe("leave a message", () => {
    it("should watch the message appears at correct place", () => {
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

      //after
      after(() =>{
        //load page
        cy.get(".btn").contains("view my invoices")
          .click();

        cy.get("tbody")
          .find("tr")
          .should("have.length", 1);

        cy.get("tbody")
          .find("tr")
          .eq(0)
          .find("td")
          .eq(4)
          .contains("good quality").should("exist")
      })
      });
  });
});
