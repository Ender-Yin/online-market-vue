//const apiURL = "https://online-market-api-staging.herokuapp.com/things/";
const apiURL = "http://localhost:3000/things/";

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

  describe("Manage the thing", () => {
    it("should four things in the list", () => {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 4);
    });
  });
});
