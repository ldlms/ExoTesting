describe('Mes tests', () => {
  it('ajout', () => {
    cy.visit('https://leo.adrardev.fr/addUser')
    cy.get(':input[name="nom"]').type('jean')
    cy.get(':input[name="prenom"]').type('cule')
    cy.get(':input[name="mail"]').type('jean@gmail.com')
    cy.get(':input[name="mdp"]').type('password')
    cy.get(':input[name="submit"]').click()
    cy.get('#msgzone').should('contain',"Le compte a été ajouté en BDD")
  })
  it('doublon', () => {
    cy.visit('https://leo.adrardev.fr/addUser')
    cy.get(':input[name="nom"]').type('jean')
    cy.get(':input[name="prenom"]').type('cule')
    cy.get(':input[name="mail"]').type('jean@gmail.com')
    cy.get(':input[name="mdp"]').type('password')
    cy.get(':input[name="submit"]').click()
    cy.get('#msgzone').should('contain',"Les informations sont incorrectes")
  })
  it('erreur', () => {
    cy.visit('https://leo.adrardev.fr/addUser')
    cy.get(':input[name="nom"]').type('jean')
    cy.get(':input[name="mail"]').type('jean@gmail.com')
    cy.get(':input[name="mdp"]').type('password')
    cy.get(':input[name="submit"]').click()
    cy.get('#msgzone').should('contain',"Veuillez remplir tous les champs du formulaire")
  })
})
