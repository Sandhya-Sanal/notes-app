const notesDiv = document.getElementById('notes');
const form = document.getElementById('noteForm');

const API_URL = 'http://localhost:5000/notes';

function fetchNotes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      notesDiv.innerHTML = '';
      data.forEach(note => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>
                         <button onclick="deleteNote(${note.id})">Delete</button>`;
        notesDiv.appendChild(div);
      });
    });
}

function deleteNote(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => fetchNotes());
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ title, content })
  }).then(() => {
    form.reset();
    fetchNotes();
  });
});

fetchNotes();

