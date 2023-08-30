describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      'username': 'username',
      'password': 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('username logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('http://url')
      cy.get('#create').click()
      cy.contains('a new blog title by author added')
    })

    it('a blog can be liked', function() {
      cy.createBlog({ title: 'title', author: 'author', url: 'http://url' })
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('a blog can be deleted', function() {
      cy.createBlog({ title: 'title', author: 'author', url: 'http://url' })
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.contains('Blog removed')
    })

    it('blogs are ordered according to likes', function() {
      cy.createBlog({ title: 'title1', author: 'author1', url: 'http://url1', likes: 1 })
      cy.createBlog({ title: 'title2', author: 'author2', url: 'http://url2', likes: 2 })
      cy.createBlog({ title: 'title3', author: 'author3', url: 'http://url3', likes: 3 })
      cy.get('.blog-abstracts').then(blogs => {
        cy.wrap(blogs[0]).contains('title3')
        cy.wrap(blogs[1]).contains('title2')
        cy.wrap(blogs[2]).contains('title1')
      })
    })
  })

  describe('When one user logged in and create a blog, another user cannot delete it', function() {
    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
      cy.createBlog({ title: 'title', author: 'author', url: 'http://url' })
      cy.contains('Log out').click()
      const user = {
        'username': 'username2',
        'password': 'password2'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'username2', password: 'password2' })
    })

    it('a blog cannot be deleted', function() {
      cy.contains('show').click()
      cy.contains('remove').should('not.exist')
    })
  })
})