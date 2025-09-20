const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Note = mongoose.model('Note', NoteSchema);

// Routes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

app.listen(5000, () => console.log('Backend running on port 5000'));

