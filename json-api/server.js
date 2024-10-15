const express = require('express');
const bodyParser = require('body-parser');
const xmlbuilder = require('xmlbuilder');
const app = express();
const port = 3001;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Sample data buku
let books = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata" },
    { id: 2, title: "Entrok", author: "Okky Madasari" },
    { id: 3, title: "Ronggeng Dukuh Paruk", author: "Ahmad Tohari" },
    { id: 4, title: "Sumur", author: "Eka Kurniawan" },
    { id: 5, title: "Laut Bercerita", author: "Dwi DeaLeila S. Chudori" },
];

// Endpoint GET untuk mendapatkan daftar buku
app.get('/books', (req, res) => {
    const acceptHeader = req.headers.accept;
    if (acceptHeader && acceptHeader.includes('application/xml')) {
        // Mengubah data menjadi format XML
        const xml = xmlbuilder.create('books');
        books.forEach(book => {
            xml.ele('book', { id: book.id })
                .ele('title', book.title)
                .up()
                .ele('author', book.author)
                .up();
        });
        res.header('Content-Type', 'application/xml');
        res.send(xml.end({ pretty: true }));
    } else {
        // Mengembalikan data dalam format JSON
        res.json(books);
    }
});

// Endpoint POST untuk menambahkan buku baru
app.post('/books', (req, res) => {
    console.log(req.body); // Menampilkan isi permintaan
    const newBook = req.body;
    newBook.id = books.length + 1; // Menetapkan ID baru
    books.push(newBook);
    res.status(201).json(newBook);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});