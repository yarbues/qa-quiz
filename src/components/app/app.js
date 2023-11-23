const express = require('express');
const app = express();

app.use(express.json());

const ACCOUNTS_PATH = './storage/account.json';

app.post('/user', (req, res) => {
  // Your logic for creating a new user
  res.send('Account Created');
});

app.delete('/user', (req, res) => {
  // Your logic for deleting a user
  res.send('Account Deleted');
});

app.put('/user', (req, res) => {
  // Your logic for updating a user
  res.send('Account Updated');
});

module.exports = app;