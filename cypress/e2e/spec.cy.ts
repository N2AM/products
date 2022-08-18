describe('My First Test', () => {
  before(() => {
    cy.visit('/')
  })
  it('Visits the initial project page', () => {
    cy.contains('Code')
    cy.contains('Name')
    cy.contains('Price (EUR)')
    cy.contains('Price + Tax (EUR)')
    cy.contains('Edit')
  })
  it('Adding new product', () => {
    cy.get('#add-data').click()
    cy.fixture('product').then((product) => {
      cy.get('#code').type(product.code)
      cy.get('#name').type(product.name)
      cy.get('#basePrice').type(product.basePrice)
      cy.get('#submit').click()
    })
})
  it('Edit a product', () => {
    cy.get('#edit-1').click()
    cy.fixture('product').then((product) => {
      cy.get('#Code-1').clear()
      cy.get('#Code-1').type(product.code)
      cy.get('#Name-1').clear()
      cy.get('#Name-1').type(product.name)
      cy.get('#done-1').click()
    })
  })

  it('View the bill and go back to product', () => {
    cy.get('#go-to-bill').click()
    cy.contains('Bill Summary')
    cy.contains('SubTotal:')
    cy.contains('Taxed SubTotal')
    cy.get('#back-to-products').click()
  })
})

