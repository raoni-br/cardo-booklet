import createError from 'http-errors';

import { Book } from '@cardo-booklet/booklet-utils';

// There is no requirement to manage books for each user.
// That means that the a user can manage all books, regardless of who is the owner.

export class BookModel {
    getAllBooks(): Book[] {
        return global.bookCatalog;
    }

    getBookById(id: string): Book | null {
        return global.bookCatalog.find((book) => (book.id === id)) || null;
    }

    createBook(book: Book): void {
        if (this.getBookById(book.id)) {
            throw createError(400, 'Book is already registered');
        }
        global.bookCatalog.push(book);
    }

    updateBook(updatedBook: Book): Book {
        const book = this.getBookById(updatedBook.id);
        if (!book) {
            throw createError(400, 'Book not found');
        }

        // replace book in catalog
        global.bookCatalog.splice(global.bookCatalog.indexOf(book), 1, updatedBook);

        return updatedBook;
    }

    deleteBook(id: string): void {
        const book = this.getBookById(id);
        if (!book) {
            throw createError(400, 'Book not found');
        }

        // delete book in catalog
        global.bookCatalog.splice(global.bookCatalog.indexOf(book), 1);
    }
}
