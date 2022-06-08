describe("App de clima", () => {
  it("a cidade deve ser inválida", () => {
    cy.visit("/");
    cy.get('[data-cy="search-input"]').type("AAAAAA");
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="message"]').should(
      "have.text",
      "A cidade AAAAAA não foi encontrada"
    );
  });

  it.only("deve realizar todo o ciclo, conferindo as informações da página, no fim fazendo uma nova busca e confirmando se a cidade realmente mudou", () => {
    cy.visit("/");
    cy.get('[data-cy="message"]').should(
      "have.text",
      "Nenhuma consulta para exibir"
    );
    cy.get('[data-cy="search-input"]').type("Belo Horizonte");
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="data"]').should("be.visible");
    cy.get('[data-cy="city-name"]').should(
      "have.text",
      "Belo Horizonte, Brazil"
    );
    cy.get('[data-cy="see-more"]').click();
    cy.getHour();
    cy.get('[data-cy="arrow-left"]').click();
    cy.getHourMinus();
    cy.get('[data-cy="arrow-right"]').click();
    cy.getHour();
    cy.dateToday();
    cy.dateTomorrow();
    cy.dateAfterTomorrow();
    cy.get('[data-cy="search-input"]').type("Sao Paulo");
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="data"]').should("be.visible");
    cy.get('[data-cy="city-name"]').should("have.text", "Sao Paulo, Brazil");
  });
});
