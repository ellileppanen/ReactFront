describe('testi harjoittelua', function () {

  beforeEach(function () {
      cy.visit('https://zealous-water-08a030103.6.azurestaticapps.net/')
  })

  it('Sisäänkirjautuminen onnistuu', function(){
    cy.visit('https://zealous-water-08a030103.6.azurestaticapps.net/')
    cy.contains('Login')
    cy.get('#UsernameInput').type('testitero')
    cy.get('#PasswordInput').type('testaaja')
    cy.contains('Login').click()
    cy.wait(5000)
    
  })

  it('Sivu avautuu ja näyttää datarivejä', function () {
    cy.visit('https://zealous-water-08a030103.6.azurestaticapps.net/')
    cy.contains('Login')
    cy.get('#UsernameInput').type('testitero')
    cy.get('#PasswordInput').type('testaaja')
    cy.contains('Login').click()
    cy.wait(5000)
    //testataan pääsy product sivulle
    cy.contains('Products').click()
    cy.contains('Add new')
    cy.wait(5000)
    cy.contains('Chai') // jos on saatu dataa kannasta
    cy.contains('Northwind Corporation')
  })

})