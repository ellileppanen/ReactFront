describe('testi harjoittelua', function () {

  beforeEach(function () {
      cy.visit('https://zealous-water-08a030103.6.azurestaticapps.net/')
      //kirjaudutaan sisään ennen jokaista testiä
      cy.contains('Login')
      cy.get('#UsernameInput').type('testitero')
      cy.get('#PasswordInput').type('testaaja')
      cy.contains('Login').click()
      //odotetaan messagen poistuminen
      cy.wait(5000)
  })

  //sisäänkirjautumisen testaus, ensimmäinen testi harjoitus
  //tapahtuu loopissa nykyään ennen joka testiä
  // it('Sisäänkirjautuminen onnistuu', function(){
  //   cy.contains('Login')
  //   cy.get('#UsernameInput').type('testitero')
  //   cy.get('#PasswordInput').type('testaaja')
  //   cy.contains('Login').click()
    
  // })

  it('Sivu avautuu ja näyttää datarivejä', function () {
    cy.contains('Products').click()
    cy.contains('Add new')
    //annetaan backendille aikaa ladata tuotteet
    cy.wait(5000)
    //tuotteet ladattuna, chai olisi ensimmäinen tuote 
    cy.contains('Chai')
    cy.contains('Chai').click()
    cy.contains('Edit')
    cy.contains('Chai').click()
    cy.contains('Northwind Corporation')
  })

  it('Lisätään ja poistetaan testituote', function () {
    //mennään product sivulle
    cy.contains('Products').click()
    //testi tuotteen lisäys
    cy.contains('Add new').click()
    cy.get('#productName').type('testi tuote')
    cy.get('#quantityPerUnit').type('200')
    cy.get('#unitPrice').type('5')
    cy.get('#unitsInStock').type('1000')
    cy.contains('Save').click()
    //odotetaan että viestikomponentti poistuu
    cy.wait(8000) 
    //testi tuotteen poisto
    cy.contains('testi tuote').click()
    cy.contains('Delete').click()
    cy.contains('Succesfully removed testi tuote')
  })

})