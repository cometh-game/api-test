const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Récupérer la liste des utilisateurs
app.get('/api/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(data.users);
});

// Récupérer la liste des livres
app.get('/api/books', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(data.books);
});

// Ajouter un utilisateur
app.post('/api/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  const newUser = req.body;
  newUser.id = data.users.length + 1;
  data.users.push(newUser);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(newUser);
});

// Ajouter un livre
app.post('/api/books', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  const newBook = req.body;
  newBook.id = data.books.length + 1;
  data.books.push(newBook);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(newBook);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
