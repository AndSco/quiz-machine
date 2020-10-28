///<reference types="Cypress" />
import { breakpoints } from "../../client/src/constants/breakpoints";
import { extractNumberFromBreakpoint } from "../../client/src/utils/functions";

beforeEach(() => {
  cy.visit("/");
  cy.get("[data-testid='burger-icon'] > :nth-child(1)").as("burger");
  cy.get("[data-cy='quiz-title']").as("quiz-section-title");
});

describe("navbar", () => {
  it("renders navbar correctly on big screens", () => {
    cy.viewport(
      extractNumberFromBreakpoint(breakpoints.hugeScreens) + 10,
      2400
    );
    cy.get("li").should("have.length", 3);

    cy.get("button").contains(/create your own quiz/i);

    cy.get("[data-cy='mobile-menu']").should("not.be.visible");
  });

  it("shows mobile menu and burger icon below medium screen size", () => {
    cy.viewport(
      extractNumberFromBreakpoint(breakpoints.mediumScreens) - 10,
      2500
    );

    cy.get("@burger").should("exist");
    cy.get("li").should("not.exist");
    cy.get("[data-cy='mobile-menu']").should("not.be.visible");
    cy.get("@burger").click();
    cy.get("[data-cy='mobile-menu'] > :nth-child(1)").should("be.visible");
    cy.get("@burger").click();
    cy.get("[data-cy='mobile-menu'] > :nth-child(1)").should("not.be.visible");
  });

  it("lets user browse through quiz categories on big screens", () => {
    cy.viewport(
      extractNumberFromBreakpoint(breakpoints.hugeScreens) + 10,
      2400
    );

    cy.get("@quiz-section-title").contains(/trivia quiz/i);

    cy.get("[data-cy='thumbnail']").should("have.length", 25);

    cy.get("li")
      .contains(/programming quiz/i)
      .click();
    cy.get("@quiz-section-title").contains(/programming quiz/i);
    cy.get("[data-cy='thumbnail']").should("have.length", 9);

    cy.get("li")
      .contains(/users' quizzes/i)
      .click();
    cy.get("p").contains(/Try a quiz created by a fellow user/i);
  });

  it("styles selected menu item correctly", () => {
    cy.viewport(
      extractNumberFromBreakpoint(breakpoints.hugeScreens) + 10,
      2400
    );
    cy.get("li")
      .contains(/trivia quiz/i)
      .then($el =>
        expect($el).to.have.css("border-bottom", "4px solid rgb(255, 207, 16)")
      );
    cy.get("li")
      .contains(/programming quiz/i)
      .then($el =>
        expect($el).to.have.css("border-bottom", "4px solid rgb(255, 255, 255)")
      );
  });

  it("lets user browse through quiz categories on mobile", () => {
    cy.viewport(
      extractNumberFromBreakpoint(breakpoints.smallestScreens) - 10,
      2400
    );

    cy.get("@burger").click();
    cy.get("li")
      .contains(/programming quiz/i)
      .click();
    cy.get("@burger").click();
    cy.get("@quiz-section-title")
      .invoke("text")
      .should("equal", "PROGRAMMING QUIZ");
  });
});
