describe('Login Navigation Test', () => {
  it('sollte zur Login Seite weiterleiten, wenn auf den Login Link geklickt wird', () => {

    cy.visit('http://localhost:3000'); 

    cy.get('a').contains('Login').click();

    cy.url().should('include', '/login');
    
    cy.get('h1').should('contain', 'Login');
  });
});

describe('Login & Navigation Tests', () => {

  // Aufgabe 2: Testet den Weg von Home zu Login
  it('sollte zur Login Seite weiterleiten, wenn auf den Login Link geklickt wird', () => {
    cy.visit('http://localhost:3000'); 

    // Man klickt auf den Login Link im Menü
    cy.get('a').contains('Login').click();

    // Überprüfung der URL
    cy.url().should('include', '/login');

    // Korrektur für (Zeil 10) Prüfen, ob Login als Überschrift da ist
    cy.get('h1').should('contain', 'Login');
  });

  // Testet den Schutz der Create Seite (Neuer Post)
  it('sollte unangemeldete User von "Neuer Post" zum Login leiten', () => {
    cy.visit('http://localhost:3000');
    
    // Wir klicken darauf, während wir noch nicht eingeloggt sind
    cy.contains('Neuer Post').click(); 
    
    // Die Anforderung sagt:, Man muss auf der Login Seite landen
    cy.url().should('include', '/login');

  });

});