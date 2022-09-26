/// <reference types='cypress' />

beforeEach(() => {
    cy.task('clearNock')
})

it('Zero test', () => {
    cy.visit('localhost:3000/home', { failOnStatusCode: false })
    cy.get('[id=__next]').should('not.be.empty')
})

it('One test', () => {
    const joke = "Rajesh like to stay grounded"

    cy.task('setupNock', {
        hostname: "https://icanhazdadjoke.com/",
        method: "GET",
        Headers: {
            "Accept": "application/json"
        },
        path: "/",
        statusCode: 200,
        body: {
            joke
        }
    })
    cy.visit('localhost:3000/home', { failOnStatusCode: false })
    cy.get('[id=__next]').should('contain.text', joke)
})

it('Two test run', () => {
    const user = [{
        id: 1,
        name: "Rajesh",
        lastname: "Panigrahi"
    },
    {
        id: 2,
        name: "Ramesh",
        lastname: "Panigrahi"
    },
    {
        id: 1,
        name: "Rakesh",
        lastname: "Panigrahi"
    }]

    cy.task('setupNock', {
        hostname: "https://icanhazdadjoke.com/",
        method: "GET",
        Headers: {
            "Accept": "application/json"
        },
        path: "/",
        statusCode: 200,
        body: {
            user
        }
    })
    cy.visit('localhost:3000/home', { failOnStatusCode: false })
    cy.get('[data-cy=sel]').should('contain.text', 'Rajesh')
})