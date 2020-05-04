describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const userTester = {
      name: 'Tester',
      username: 'tester',
      password: 'tester123',
    }
    cy.request('POST', 'http://localhost:3003/api/users', userTester)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('tester123')
      cy.get('#login-button').click()

      cy.contains('Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrongPass')
      cy.get('#login-button').click()

      cy.get('.notif').should('contain', 'invalid username or password')
      cy.get('.notif').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notif').should('have.css', 'border-style', 'solid')
      cy.get('.notif').should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'tester123' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog End User Test 1')
      cy.get('#author').type('Tester')
      cy.get('#url').type('http://localhost:3003/blogtest/1')
      cy.get('#create-blog').click()

      cy.get('.notif').should('contain', 'Blog End User Test 1')
      cy.get('.notif').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.notif').should('have.css', 'border-style', 'solid')
      cy.get('.notif').should('have.css', 'border-color', 'rgb(0, 128, 0)')
    })
  })
})
