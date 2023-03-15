const books: Book[] = []; // in-memory book database

interface Book {
    id: string; // ISBN
    title: string;
    author: string;
    releaseYear: number;
}

export class BookModel {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    getBooksByUser() {} // Book[]
    getBookById(id: string) {} // Book
    createBook(book: Book) {} // Book
    updateBook(book: Book) {} // Book
    deleteBook(id: string) {} // Book
}
