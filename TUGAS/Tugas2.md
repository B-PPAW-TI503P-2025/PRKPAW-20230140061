# Tugas 2: Screenshot API Endpoint CRUD untuk Aplikasi Manajemen Buku Perpustakaan

Berikut adalah screenshot dari endpoint CRUD API yang telah diuji:

## 1. GET /books (Membaca Semua Buku)

Endpoint: `GET http://localhost:3000/books`

Response (ketika kosong):
```
[]
```

## 2. POST /books (Membuat Buku Baru)

Endpoint: `POST http://localhost:3000/books`

Request Body:
```json
{
  "title": "Book1",
  "author": "Author1",
  "year": 2020
}
```

Response:
```json
{
  "id": 1,
  "title": "Book1",
  "author": "Author1",
  "year": 2020
}
```

## 3. GET /books/:id (Membaca Buku Tunggal)

Endpoint: `GET http://localhost:3000/books/1`

Response:
```json
{
  "id": 1,
  "title": "Book1",
  "author": "Author1",
  "year": 2020
}
```

## 4. PUT /books/:id (Memperbarui Buku)

Endpoint: `PUT http://localhost:3000/books/1`

Request Body:
```json
{
  "title": "Updated Book1",
  "author": "Updated Author1",
  "year": 2021
}
```

Response:
```json
{
  "id": 1,
  "title": "Updated Book1",
  "author": "Updated Author1",
  "year": 2021
}
```

## 5. DELETE /books/:id (Menghapus Buku)

Endpoint: `DELETE http://localhost:3000/books/1`

Response: 204 No Content

## 6. GET /books setelah penghapusan

Endpoint: `GET http://localhost:3000/books`

Response:
```
[]
```

## 7. GET /books/:id untuk ID yang tidak ada (Error Handling)

Endpoint: `GET http://localhost:3000/books/999`

Response:
```json
{
  "error": "Book not found"
}
```

## Logging

Setiap request dicatat di console server dengan format: timestamp, method, URL.

Contoh log:
```
2025-10-10T14:00:59.000Z GET /books
2025-10-10T14:00:43.000Z PUT /books/1
```

## Error Handling

- 404 Not Found untuk endpoint yang tidak ada atau buku tidak ditemukan.
- Global error handler untuk error internal server.
- Validasi input untuk operasi CRUD.
