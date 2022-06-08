const hour = new Date().getHours();
const day = new Date().getDate();
const month = new Date().getMonth();
const correctMonth = (month + 1).toString().padStart(2, "0");

Cypress.Commands.add("getHour", () => {
  let hourNow;

  if (hour === 23) {
    hourNow = "00:00";
  } else if (hour < 9) {
    hourNow = `0${hour + 1}:00`;
  } else {
    hourNow = `${hour + 1}:00`;
  }

  cy.get('[data-cy="hour"]').should("have.text", hourNow);
});

Cypress.Commands.add("getHourMinus", () => {
  let hourNow = `${hour.toString().padStart(2, "0")}:00`;
  cy.get('[data-cy="hour"]').should("have.text", hourNow);
});

Cypress.Commands.add("dateToday", () => {
  let today = `${day.toString().padStart(2, "0")}/${correctMonth}`;
  cy.get('[data-cy="forecast0"]').should("have.text", today);
});

Cypress.Commands.add("dateTomorrow", () => {
  let tomorrow = `${(day + 1).toString().padStart(2, "0")}/${correctMonth}`;
  cy.get('[data-cy="forecast1"]').should("have.text", tomorrow);
});

Cypress.Commands.add("dateAfterTomorrow", () => {
  let afterTomorrow = `${(day + 2)
    .toString()
    .padStart(2, "0")}/${correctMonth}`;
  cy.get('[data-cy="forecast2"]').should("have.text", afterTomorrow);
});
