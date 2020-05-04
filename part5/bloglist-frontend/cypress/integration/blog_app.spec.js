describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ name: 'Tester', username: 'tester', password: 'tester123' })
    cy.createUser({
      name: 'Tester2',
      username: 'tester2',
      password: 'tester123',
    })
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

    describe('when blog post was created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog End User Test 2',
          author: 'Tester',
          url: 'http://localhost:3003/blogtest/2',
        })

        cy.createBlog({
          title: 'Blog End User Test 3',
          author: 'Tester',
          url: 'http://localhost:3003/blogtest/3',
          likes: 5,
        })

        cy.createBlog({
          title: 'Blog End User Test 4',
          author: 'Tester',
          url: 'http://localhost:3003/blogtest/4',
          likes: 10,
        })
      })

      it('like blog post', function () {
        cy.contains('Blog End User Test 2').parent().parent().as('parent')
        cy.get('@parent')
          .children()
          .contains('Blog End User Test 2')
          .parent()
          .find('button')
          .click()

        cy.get('@parent')
          .children()
          .contains('hide')
          .parent()
          .children('.blog-likes')
          .find('button')
          .click()

        cy.get('@parent')
          .children()
          .contains('hide')
          .parent()
          .children('.blog-likes')
          .should('contain', '1')
      })

      it('user that created blog can delete it', function () {
        cy.contains('Blog End User Test 2').parent().parent().as('parent')
        cy.get('@parent')
          .children()
          .contains('Blog End User Test 2')
          .parent()
          .find('button')
          .click()

        cy.get('@parent')
          .children()
          .contains('hide')
          .parent()
          .contains('remove')
          .click()

        cy.get('.notif').should('contain', 'Blog End User Test 2')
        cy.get('.notif').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.notif').should('have.css', 'border-style', 'solid')
        cy.get('.notif').should('have.css', 'border-color', 'rgb(0, 128, 0)')
      })

      it('user that did not created blog cannot delete it', function () {
        cy.contains('logout').click()

        cy.get('#username').type('tester2')
        cy.get('#password').type('tester123')
        cy.get('#login-button').click()

        cy.contains('Blog End User Test 2').parent().parent().as('parent')
        cy.get('@parent')
          .children()
          .contains('Blog End User Test 2')
          .parent()
          .find('button')
          .click()

        cy.get('@parent')
          .children()
          .contains('hide')
          .parent()
          .get('#delete-button')
          .should('have.css', 'display', 'none')
      })
    })
  })
})
