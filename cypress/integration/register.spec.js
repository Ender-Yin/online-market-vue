const apiURL = "http://localhost:3000/users/";

describe("test register page", () => {
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
    // visit register page
    cy.visit("/")
    cy.get(".navbar-nav")
      .eq(1)
      .find(".nav-item")
      .eq(3)
      .click();
  })
  describe("input already exist user's username", () =>{
    it("should show user already exist", () =>{
      cy.get("#username").type("ender")
      cy.get("#pwd").type("123")
      cy.get("#again").type("123")

      cy.get("#register").click()

      //after
      after( () => {
        cy.get("div").should("contain", "user already exist")
      })
    })
  })

  describe("input not exist username but two password is not the same", () =>{
    it("should show two password is different, register failed. And this username can't log in", () =>{
      cy.get("#username").type("yyc")
      cy.get("#pwd").type("123")
      cy.get("#again").type("321")

      cy.get("button").contains("register").click()

      //after
      after( () => {
        cy.get("div").should("contain", "two password is different, register failed")

        // visit login page
        cy.visit("/")
        cy.get(".navbar-nav")
          .eq(1)
          .find(".nav-item")
          .eq(2)
          .click();
        //input
        cy.get("#username").type("yyc")
        cy.get("#pwd").type("123")

        cy.get("button").contains("LOG IN").click()
        // do it again
        cy.get("#username").type("yyc")
        cy.get("#pwd").type("123")

        cy.get("button").contains("LOG IN").click()
        // result
        cy.get("p").should("contain", "user doesn't exist")
      })
    })
  })

  describe("input not existed username , and two password is the same", () =>{
    it("should show user create successfully", () =>{
      cy.get("#username").type("yyc")
      cy.get("#pwd").type("123")
      cy.get("#again").type("123")

      cy.get("button").contains("register").click()

      after( () => {
        cy.get("p").should("contain", "welcome")

        // visit login page
        cy.visit("/")
        cy.get(".navbar-nav")
          .eq(1)
          .find(".nav-item")
          .eq(2)
          .click();
        //imput
        cy.get("#username").type("yyc")
        cy.get("#pwd").type("123")

        cy.get("button").contains("LOG IN").click()
        // do it again
        cy.get("#username").type("yyc")
        cy.get("#pwd").type("123")

        cy.get("button").contains("LOG IN").click()
        //result
        cy.get("p").should("contain", "welcome")
      })
    })
  })
})
