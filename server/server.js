const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let posts = [
  { id: 1, komentarz: 'Pierwszy post!', zdjecie: '' },
  { id: 2, komentarz: 'Cześć wszystkim!', zdjecie: '' }
];

app.use(cors());
app.use(bodyParser.json());

app.get('/api/posts', (req, res) => res.json(posts));

app.post('/api/posts', (req, res) => {
  const newPost = { id: Date.now(), ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index !== -1) {
    posts[index] = { ...posts[index], ...req.body };
    res.json(posts[index]);
  } else {
    res.status(404).json({ error: 'Post nie znaleziony' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`✅ Serwer działa na http://localhost:${PORT}`));