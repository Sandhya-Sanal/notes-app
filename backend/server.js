const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'notes_user',
  password: 'notes_password',
  database: 'notes_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes
app.get('/notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  db.query('INSERT INTO notes(title, content) VALUES(?, ?)', [title, content], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, content });
  });
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id=?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Note deleted' });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));

