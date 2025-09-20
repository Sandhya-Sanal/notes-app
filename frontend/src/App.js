import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/notes').then(res => setNotes(res.data));
  }, []);

  const addNote = async () => {
    const res = await axios.post('http://localhost:5000/notes', form);
    setNotes([...notes, res.data]);
    setForm({ title: '', content: '' });
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map((n) => (
          <li key={n._id}><strong>{n.title}</strong>: {n.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

