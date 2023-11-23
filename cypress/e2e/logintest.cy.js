describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080');
    });
  
    it('should log in successfully using valid credentials', () => {
        cy.fixture('example.json').then((accounts) => {
          const userKeys = Object.keys(accounts);
          const randomIndex = Math.floor(Math.random() * userKeys.length);
          const randomUser = accounts[userKeys[randomIndex]];
      
          cy.intercept('POST', 'http://localhost:9999/user', (req) => {
            const { username, password } = req.body;
            const user = accounts[username];
      
            if (user && user.password === password) {
              req.reply({ statusCode: 200, body: { message: 'Login successful' } });
            } else {
              req.reply({ statusCode: 401, body: { message: 'Invalid credentials' } });
            }
          }).as('loginRequest');
      
          cy.get('[placeholder="Enter Username"]').type(randomUser.username);
          cy.get('[placeholder="password"]').type(randomUser.password);
          cy.get('.sc-bZQynM').click();

      });
    });

    it('should display incorrect invalid credentials', () => {
        cy.fixture('invaliduser.json').then((accounts) => {
          console.log(accounts); 
          const userKeys = Object.keys(accounts);
          const randomIndex = Math.floor(Math.random() * userKeys.length);
          const randomUser = accounts[userKeys[randomIndex]];
          cy.intercept('POST', '/api/login', {
            statusCode: 401,
            body: { message: 'Invalid credentials' },
          }).as('loginRequest');

          cy.get('[placeholder="Enter Username"]').type(randomUser.username);
          cy.get('[placeholder="password"]').type(randomUser.password);
    
          cy.get('.sc-bZQynM').click();
          cy.get('.error-message').should('exist');
    
        });
      });
  });