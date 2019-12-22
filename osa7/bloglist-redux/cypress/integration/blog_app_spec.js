describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Wayne',
      username: 'jwayne',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('user can login', function () {
    cy.get('#username')
      .type('jwayne')
    cy.get('#password')
      .type('salainen')
    cy.contains('login')
      .click()
    cy.contains('logged in as John Wayne')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('jwayne')
      cy.get('#password')
        .type('salainen')
      cy.contains('login')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('logged in as John Wayne')
    })

    it('a new blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('This blog was added by cypress')
      cy.get('#author')
        .type('Cypress-Bot')
      cy.get('#url')
        .type('http://www.example.com')
      cy.get('#submit')
        .click()
      cy.contains('This blog was added by cypress by Cypress-Bot')
    })

    describe('and a blog is created', function () {
      beforeEach(function() {
        cy.contains('new blog')
         .click()
        cy.get('#title')
          .type('This blog was added by cypress')
        cy.get('#author')
          .type('Cypress-Bot')
        cy.get('#url')
          .type('http://www.example.com')
        cy.get('#submit')
          .click()
      })
      it('it can be opened', function () {
        cy.get('#blogLink0')
          .contains('This blog was added by cypress')
          .click()
      })
      it('it can be liked', function () {
        cy.get('#blogLink0')
          .click()
        cy.contains('0 likes')
        cy.get('#addLike')
          .click()
        cy.contains('1 like')
      })
      it('it shows in the user blog count', function() {
        cy.contains('users')
          .click()
        cy.contains('1')
      })
    })
  })
})
