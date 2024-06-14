describe('Authentication', () => {
    it('should register a new user', () => {
        cy.visit('http://localhost:3000/register');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.contains('User registered successfully');
    });

    it('should login an existing user', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.contains('Welcome');
    });
});
