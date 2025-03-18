import type {} from 'cypress';
import {ApiUrl} from "../../src/constants/api";
import ingredientFixture from './../fixtures/ingredients.json';
import {clearTokens, setTokens} from "../../src/utils/token-storage";

describe("Проверка конструктора", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.intercept("PATCH", `${ApiUrl}/auth/user`, { fixture: "user" });
        cy.intercept("GET", `${ApiUrl}/ingredients/`, { fixture: "ingredients" });
    })

    const firstBun = ingredientFixture.data.find(
        (ingredient) => ingredient.type === "bun"
    );

    it("Ингредиенты загружены", () => {
        expect(firstBun?.type).to.equal("bun");
        cy.get('[data-cy="ingredients-wrapper"] [data-category="bun"]').should('have.length.greaterThan', 0);
    })

    describe("Проверка модальных окон", () => {
        beforeEach(() => {
            cy.get('[data-cy="ingredients-wrapper"] [data-category="bun"] [data-cy="ingredient"]').first().click();
        })
        it('Открывается модальное окно по клику с описание ингридиента', () => {
            cy.get('[data-cy="modal"] main h2').should('have.text', firstBun?.name);
        })
        it('Модальное окно закрывается через крестик', () => {
            cy.get('[data-cy="modal"] header svg').click();
            cy.get('[data-cy="modal"]').should('not.exist');
        })
        it('Модальное окно закрывается через escape', () => {
            cy.get('body').type('{esc}');
            cy.get('[data-cy="modal"]').should('not.exist');
        })
        it('Модальное окно закрывается по клику на оверлей', () => {
            cy.get('[data-cy="modal-overlay"]').click({force: true});
            cy.get('[data-cy="modal"]').should('not.exist');
        })
    })
    describe("Проверка DnD", () => {
        it("Перетаскивание булки", () => {
            cy.get('[data-cy="ingredients-wrapper"] [data-category="bun"] [data-cy="ingredient"]').first()
                .trigger('dragstart')
            cy.get('[data-cy="constructor-wrapper"]').first().trigger('drop');
            cy.get('[data-cy="constructor-wrapper"] .constructor-element').first().should('contain.text', '(верх)')
        })
        it("Перетаскивание ингредиента", () => {
            cy.get('[data-cy="ingredients-wrapper"] [data-category="sauce"] [data-cy="ingredient"]').first()
                .trigger('dragstart')
            cy.get('[data-cy="constructor-wrapper"]').first().trigger('drop');
            cy.get('[data-cy="constructor-wrapper"] ul').first().should('have.length.greaterThan', 0)
        })
    })
    describe("Создание заказа", () => {
        beforeEach(() => {
            setTokens("test_access_token", "test_refresh_token");
            cy.intercept("POST", `${ApiUrl}/orders`, { fixture: "created-order" });
            cy.get('[data-cy="ingredients-wrapper"] [data-category="bun"] [data-cy="ingredient"]').first()
                .trigger('dragstart')
            cy.get('[data-cy="constructor-wrapper"]').first().trigger('drop');
            cy.get('[data-cy="ingredients-wrapper"] [data-category="sauce"] [data-cy="ingredient"]').first()
                .trigger('dragstart')
            cy.get('[data-cy="constructor-wrapper"]').first().trigger('drop');
        })

        it("Заказ создается и открыввается модальное окно", () => {
            cy.get('[data-cy="constructor-total"] button[type="submit"]').trigger('click');
            cy.get('[data-cy="modal"]').should('exist');
        })

        afterEach(() => {
            clearTokens();
        })
    })
})