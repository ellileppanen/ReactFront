describe('testi harjoittelua', function () {

  beforeEach(function () {
      cy.visit('https://zealous-water-08a030103.6.azurestaticapps.net/')
  })

  it('Sisäänkirjautuminen onnistuu', function(){
    cy.contains('Login')
    cy.get('#UsernameInput').type('testitero')
    cy.get('#PasswordInput').type('testaaja')
    cy.contains('Login').click()
  })

  it('Sivu avautuu ja näyttää datarivejä', function () {
      cy.contains('Products').click()
      cy.contains('Add new')
      cy.contains('Chai') // jos on saatu dataa kannasta
      cy.contains('Northwind Corporation')
  })

  // it('Lisäys formi aukeaa ja lisäys toimii oikein', function () {

  //     cy.contains('Add new').click()
  //     cy.contains('Save')
  //     cy.contains('Cancel')

  //     cy.get('#nimiInput').type('e2eTestikurssi')
  //     cy.get('#laajuusInput').type(101)
  //     cy.get('#tallennusNappi').click()
  //     cy.contains('Lisätty uusi kurssi: e2eTestikurssi')
  //     cy.get('h4').last().contains(101)
  // })

  // it('Kurssin poistaminen onnistuu', function () {
  //     cy.get('h4').last().children().click()
  //     cy.contains('Poisto tehty')
  //     cy.get('h4').last().should('not.contain', 'e2eTestikurssi')
  // })

})