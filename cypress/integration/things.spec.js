const apiURL = "https://online-market-api-staging.herokuapp.com/things/";

describe("Manage Things page", () => {
  beforeEach(() => {
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
    cy.visit("/");
    // Click Manage Donations navbar link
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(1)
      .click();
  });

  describe("For a confirmed delete operation", () => {
    it("reduces the no. of things by 1", () => {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 4);

      // Click trash/delete link of 3rd donation in list
      cy.get("tbody")
        .find("tr")
        .eq(2)
        .find("td")
        .eq(6)
        .find("a")
        .click();
      // Click confirmation button
      /*cy.get("button")
        .contains("Delete")
        .click();*/
      cy.get("tbody")
        .find("tr")
        .should("have.length", 3);
    });
  });

  describe("edit the first thing", ()=>{
    it("should change the price as we edit and direct to edit page", ()=> {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 4);

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(5)
        .find("a")
        .click();

      cy.url().should("include", "/edit")

      cy.get("input[data-test=price]").clear()
      cy.get("input[data-test=price]").type(10000)

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
        .should("have.length", 4);

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(3)
        .contains(10000).should("exist")

    });
  })



});
