const apiURL = "https://online-market-api-staging.herokuapp.com/things/";

describe("buy a thing page", () =>{
  beforeEach( ()=>{
    // Delete all things in the API's datastore
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

    cy.visit("/")
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(1)
      .click();
  })

  describe("Input the valid buyer's name ", () =>{
    it("watch invoices list number increase 1", () =>{
      cy.get("tbody")
        .find("tr")
        .should("have.length", 4);

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(4)
        .find("a")
        .click();

      cy.get("table")
        .contains("iphone8").should("exist")

      cy.get("input[data-test=buyer]").type("Jack");

      cy.get("button[type=submit]").click();


      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(3)
        .click();


      cy.get("tbody")
        .find("tr")
        .should("have.length", 2);
    })
  })

});
