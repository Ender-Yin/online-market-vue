const apiURL = "http://localhost:3000/users/";

describe("test login page", () => {
  beforeEach( ()=>{
    // Delete all invoices in the API's datastore
    cy.request(apiURL)
      .its("body")
      .then(users => {
        users.forEach(element => {
          cy.request("DELETE", `${apiURL}${element._id}`);
        });
      });
    // Populate API's datastore
    cy.fixture("users").then(users => {
      let [d1] = users;
      let four = [d1];
      four.forEach(user => {
        cy.request("POST", "http://localhost:3000/users/register", user);
      });
    });
    // visit login page
    cy.visit("/")
    cy.get(".navbar-nav")
      .eq(1)
      .find(".nav-item")
      .eq(2)
      .click();
  })
  describe("input incorrect username", () =>{
    it("should show user doesn't exist", () =>{
      cy.get("#username").type("yyc")
      cy.get("#pwd").type("123")

      cy.get("button").contains("LOG IN").click()
      // do it again
      cy.get("#username").type("yyc")
      cy.get("#pwd").type("123")

      cy.get("button").contains("LOG IN").click()


        cy.get("p").should("contain", "user doesn't exist")

    })
  })

  describe("input correct username but incorrect password", () =>{
    it("should show password incorrect", () =>{
      cy.get("#username").type("ender")
      cy.get("#pwd").type("321")

      cy.get("button").contains("LOG IN").click()
      // do it again
      cy.get("#username").type("ender")
      cy.get("#pwd").type("321")

      cy.get("button").contains("LOG IN").click()


        cy.get("p").should("contain", "password incorrect")

    })
  })

  describe("input correct username and correct password", () =>{
    it("should show welcome", () =>{
      cy.get("#username").type("ender")
      cy.get("#pwd").type("123")

      cy.get("button").contains("LOG IN").click()
      // do it again
      cy.get("#username").type("ender")
      cy.get("#pwd").type("123")

      cy.get("button").contains("LOG IN").click()


        cy.get("p").should("contain", "welcome")

    })
  })
})
