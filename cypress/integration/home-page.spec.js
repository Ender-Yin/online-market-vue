describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/#");
  });

  it("Shows a header", () => {
    cy.get(".vue-title").should("contain", "Welcome to Online Market !!");
  });

  describe("Navigation bar", () => {
    it("Shows the required links", () => {
      cy.get(".navbar-nav")
        .eq(0)
        .within(() => {
          cy.get(".nav-item")
            .eq(0)
            .should("contain", "Home");
          cy.get(".nav-item")
            .eq(1)
            .should("contain", "Things");
          cy.get(".nav-item")
            .eq(2)
            .should("contain", "Put your Thing");
          cy.get(".nav-item")
            .eq(3)
            .should("contain", "Invoices");
        });
      cy.get(".navbar-nav")
        .eq(1)
        .within(() => {
          cy.get(".nav-item")
            .eq(0)
            .should("contain", "my things");
          cy.get(".nav-item")
            .eq(1)
            .should("contain", "my invoices");
          cy.get(".nav-item")
            .eq(2)
            .should("contain", "Login");
          cy.get(".nav-item")
            .eq(3)
            .should("contain", "register");
        });
    });

    it("Redirects when links are clicked", () => {
      cy.get("[data-test=thingbtn]").click();
      cy.url().should("include", "/put");
      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(1)
        .click();
      cy.url().should("include", "/things");
      // etc
    });
  });
});
