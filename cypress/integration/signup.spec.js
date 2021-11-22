/* eslint-disable no-undef */
describe("Login", () => {
  it("should register successfully", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get("input[type=text]").type("Usuário");
    cy.get("input[type=email]").type("usuario@email.com");
    cy.get("input[placeholder=Senha]").type("senha_super_secreta");
    cy.get("input[placeholder='Confirmar senha']").type("senha_super_secreta");
    cy.get("button[type=submit]").click();

    cy.url().should("equal", "http://localhost:3000/login");
  });
});
