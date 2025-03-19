import type {} from 'cypress';
import {ApiUrl} from "../../src/constants/api";
import ingredientFixture from './../fixtures/ingredients.json';
import {clearTokens, setTokens} from "../../src/utils/token-storage";

describe("Проверка конструктора", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.intercept("PATCH", `${ApiUrl}/auth/user`, { fixture: "user" });
        cy.intercept("GET", `${ApiUrl}/ingredients/`, { fixture: "ingredients" });
    })

    const firstBun = ingredientFixture.data.find(
        (ingredient) => ingredient.type === "bun"
    );
    const modalSelector = '[data-cy="modal"]';
    const modalOverlaySelector = '[data-cy="modal-overlay"]';
    const ingredientsWrapperSelector = '[data-cy="ingredients-wrapper"]';
    const ingredientSelector = '[data-cy="ingredient"]';
    const categoryBunSelector = '[data-category="bun"]';
    const categorySauceSelector = '[data-category="sauce"]';
    const constructorWrapperSelector = '[data-cy="constructor-wrapper"]';
    const constructorTotalSelector = '[data-cy="constructor-total"]';

    const bunItemsSelector = `${ingredientsWrapperSelector} ${categoryBunSelector} ${ingredientSelector}`;
    const sauceItemsSelector = `${ingredientsWrapperSelector} ${categorySauceSelector} ${ingredientSelector}`;

    it("Ингредиенты загружены", () => {
        expect(firstBun?.type).to.equal("bun");
        cy.get(`${ingredientsWrapperSelector} ${categoryBunSelector}`).should('have.length.greaterThan', 0);
    })

    describe("Проверка модальных окон", () => {
        beforeEach(() => {
            cy.get(`${ingredientsWrapperSelector} ${categoryBunSelector} ${ingredientSelector}`).first().click();
        })
        it('Открывается модальное окно по клику с описание ингридиента', () => {
            cy.get(`${modalSelector} main h2`).should('have.text', firstBun?.name);
        })
        it('Модальное окно закрывается через крестик', () => {
            cy.get(`${modalSelector} header svg`).click();
            cy.get(modalSelector).should('not.exist');
        })
        it('Модальное окно закрывается через escape', () => {
            cy.get('body').type('{esc}');
            cy.get(modalSelector).should('not.exist');
        })
        it('Модальное окно закрывается по клику на оверлей', () => {
            cy.get(modalOverlaySelector).click({force: true});
            cy.get(modalSelector).should('not.exist');
        })
    })
    describe("Проверка DnD", () => {
        it("Перетаскивание булки", () => {
            cy.get(bunItemsSelector).first()
                .trigger('dragstart')
            cy.get(constructorWrapperSelector).first().trigger('drop');
            cy.get(`${constructorWrapperSelector} .constructor-element`).first().should('contain.text', '(верх)')
        })
        it("Перетаскивание ингредиента", () => {
            cy.get(sauceItemsSelector).first()
                .trigger('dragstart')
            cy.get(constructorWrapperSelector).first().trigger('drop');
            cy.get(`${constructorWrapperSelector} ul`).first().should('have.length.greaterThan', 0)
        })
    })
    describe("Создание заказа", () => {
        beforeEach(() => {
            setTokens("test_access_token", "test_refresh_token");
            cy.intercept("POST", `${ApiUrl}/orders`, { fixture: "created-order" });
            cy.get(constructorWrapperSelector).as('constructorWrapper');
            cy.get(bunItemsSelector).first()
                .trigger('dragstart')
            cy.get('@constructorWrapper').first().trigger('drop');
            cy.get(sauceItemsSelector).first()
                .trigger('dragstart')
            cy.get('@constructorWrapper').first().trigger('drop');
        })

        it("Заказ создается и открыввается модальное окно", () => {
            cy.get(`${constructorTotalSelector} button[type="submit"]`).trigger('click');
            cy.get(modalSelector).should('exist');
        })

        afterEach(() => {
            clearTokens();
        })
    })
})