const express = require('express');

const app = express();

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Data storage
let books = [];
let nextId = 1;

// Routes

// GET /books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// POST /books
app.post('/books', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Title, author, and year are required' });
  }
  if (typeof year !== 'number' || year < 0) {
    return res.status(400).json({ error: 'Year must be a positive number' });
  }
  const newBook = { id: nextId++, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, year } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  if (title !== undefined && typeof title !== 'string') {
    return res.status(400).json({ error: 'Title must be a string' });
  }
  if (author !== undefined && typeof author !== 'string') {
    return res.status(400).json({ error: 'Author must be a string' });
  }
  if (year !== undefined && (typeof year !== 'number' || year < 0)) {
    return res.status(400).json({ error: 'Year must be a positive number' });
  }
  const book = books[bookIndex];
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (year !== undefined) book.year = year;
  res.json(book);
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books.splice(bookIndex, 1);
  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
