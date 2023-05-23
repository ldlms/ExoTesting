describe('test connexion', () => {
  it('passes', () => {
    let tab = [
      {
        nom:'Blageur',
        prenom:'tata',
        mail:'tata@gmail.com',
        mdp:'1234'
      },
      {
        nom:'Blageur',
        prenom:'tutu',
        mail:'titi@gmail.com',
        mdp:'1234'
      },
      {
        nom:'Blageur',
        prenom:'ed',
        mail:'ed@gmail.com',
        mdp:'1234'
      },
      {
        nom:'Blageur',
        prenom:'clotere',
        mail:'clotere@gmail.com',
        mdp:'1234'
      },
      {
        nom:'Blageur',
        prenom:'taylor',
        mail:'taylor@gmail.com',
        mdp:'1234'
      }
    ]
    for(let i = 0; i<5; i++){
    cy.visit('http://localhost/testing/Connexion')
    cy.get(':input[name="nom"]').type(tab[i].nom)
    cy.get(':input[name="prenom"]').type(tab[i].prenom)
    cy.get(':input[name="mail"]').type(tab[i].mail)
    cy.get(':input[name="mdp"]').type(tab[i].mdp)
    cy.get(':input[name="submit"]').click()
    cy.get('#msgzone').invoke("text").then((text => {
      if(text == "connexion réussie"){
        const url = "http://localhost/testing/api/addTest"
        const name = "connectUserAPI"
        let date = new Date()
        date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        const valid = true
        const json = JSON.stringify({name:name, valid:valid, date:date})
        cy.request({
          method: 'POST',
          url: url, 
          body: json,
        })
      }else{
        const url = "http://localhost/testing/api/addTest"
        const name = "connectUserAPI"
        let date = new Date()
        date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        const valid = false
        const json = JSON.stringify({name:name, valid:valid, date:date})
        cy.request({
          method: 'POST',
          url: url, 
          body: json,
        })
      }
    }))}
    })
  })