//const apiURL = "https://online-market-api-staging.herokuapp.com/things/";
const apiURL = "http://localhost:3000/things/";

describe("Manage MY OWN Things page", () => {
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
    // go to my things page
    cy.get(".btn").contains("view my things").click()
  });

  describe("For a delete operation", () => {
    it("delete the first and it should disappear", () => {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 1);

      // Click trash/delete link of 3rd donation in list
      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(5)
        .find("a")
        .click();
      // Click confirmation button
      /*cy.get("button")
        .contains("Delete")
        .click();*/
      cy.get("tbody")
        .find("tr")
        .should("have.length", 1);

      after( ()=> {

        cy.get("tbody")
          .find("tr")
          .should("have.length", 0);
      })
    });
  });

  describe("edit the first thing", ()=>{
    it("should direct to edit page and price change the price as we edit ", ()=> {
      cy.get("tbody")
        .find("tr")
        .should("have.length", 1);

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(4)
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
      cy.get(".btn")
        .contains("view my things")
        .click();

      cy.get("tbody")
        .find("tr")
        .should("have.length", 1);

      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(3)
        .contains(10000).should("exist")

    });
  })
});
