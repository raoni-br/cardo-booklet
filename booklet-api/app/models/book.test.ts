import { Book, BookModel } from './book';

const testUser = 'testuser';
const testBooks: { [key: string]: Book } = {
    bookA: {
        id: 'bookA',
        title: 'Book A',
        author: 'Raoni',
        releaseYear: 2023,
    },
    modifiedBookA: {
        id: 'bookA',
        title: 'Modified Book A',
        author: 'Another Raoni',
        releaseYear: 1990,
    },
    bookB: {
        id: 'bookB',
        title: 'Book B',
        author: 'Other',
        releaseYear: 2022,
    },
    bookC: {
        id: 'bookC',
        title: 'Book C',
        author: 'Raoni',
        releaseYear: 2019,
    },
};
describe('BookModel', () => {
    beforeEach(() => {
        global.bookCatalog = [];
    });

    describe('getAllBooks', () => {
        test('empty book catalog returns no book', () => {
            expect(new BookModel().getAllBooks().length).toBe(0);
        });

        test('book catalog with only one book', () => {
            const bookModel = new BookModel();
            global.bookCatalog = [testBooks['bookA']];

            const books = bookModel.getAllBooks();

            expect(books.length).toBe(1);
            expect(books[0].id).toBe(testBooks['bookA'].id);
        });

        test('book catalog with more than a book', () => {
            const bookModel = new BookModel();
            global.bookCatalog = [testBooks['bookA'], testBooks['bookB']];

            const books = bookModel.getAllBooks();
            expect(books.length).toBe(2);
        });
    });

    describe('getBookById', () => {
        test('empty book catalog returns no book', () => {
            expect(new BookModel().getBookById('not existent')).toBeNull();
        });

        test('Catalog with single book returns correct book', () => {
            const bookModel = new BookModel();
            global.bookCatalog = [testBooks['bookA']];

            const book = bookModel.getBookById(testBooks['bookA'].id);
            expect(book.id).toBe(testBooks['bookA'].id);
        });

        test('Catalog with multiple books returns correct book', () => {
            const bookModel = new BookModel();
            global.bookCatalog = [testBooks['bookA'], testBooks['bookB']];

            const book = bookModel.getBookById(testBooks['bookB'].id);
            expect(book.id).toBe(testBooks['bookB'].id);
        });

        test('Catalog with multiple books returns no book with id not in catalog', () => {
            const bookModel = new BookModel();
            global.bookCatalog = [testBooks['bookA'], testBooks['bookB']];

            const book = bookModel.getBookById(testBooks['bookC'].id);
            expect(book).toBeNull();
        });
    });

    describe('createBook', () => {
        test('create one book successfully', () => {
            const bookModel = new BookModel();
            bookModel.createBook(testBooks['bookA']);
            const newBook = bookModel.getBookById(testBooks['bookA'].id);
            expect(newBook).toBe(testBooks['bookA']);
        });

        test('throw exception when trying to create duplicates', () => {
            const bookModel = new BookModel();
            bookModel.createBook(testBooks['bookA']);
            const newBook = bookModel.getBookById(testBooks['bookA'].id);

            expect(newBook).toBe(testBooks['bookA']);
            expect(() => bookModel.createBook(testBooks['bookA'])).toThrow('Book is already registered');
        });

        test('create multiple books successfully', () => {
            const bookModel = new BookModel();
            bookModel.createBook(testBooks['bookA']);
            const newBookA = bookModel.getBookById(testBooks['bookA'].id);
            expect(newBookA).toBe(testBooks['bookA']);

            bookModel.createBook(testBooks['bookB']);
            const newBookB = bookModel.getBookById(testBooks['bookB'].id);
            expect(newBookB).toBe(testBooks['bookB']);

            expect(new BookModel().getAllBooks().length).toBe(2);
        });
    });

    describe('updateBook', () => {
        test('update one book successfully', () => {
            const bookModel = new BookModel();
            bookModel.createBook(testBooks['bookA']);
            const updatedBook = bookModel.updateBook(testBooks['modifiedBookA']);

            expect(updatedBook.id).toBe(testBooks['bookA'].id);
            expect(updatedBook.releaseYear).toBe(testBooks['modifiedBookA'].releaseYear);
        });

        test('throw exception when updating a book that does not exist', () => {
            const bookModel = new BookModel();
            expect(() => bookModel.updateBook(testBooks['modifiedBookA'])).toThrow('Book not found');
        });
    });

    describe('deleteBook', () => {
        test('delete one book successfully', () => {
            const bookModel = new BookModel();
            bookModel.createBook(testBooks['bookA']);
            bookModel.deleteBook(testBooks['bookA'].id);

            expect(global.bookCatalog.length).toBe(0);
        });

        test('delete book and preserve other in catalog', () => {
            const bookModel = new BookModel();
            bookModel.createBook(testBooks['bookA']);
            bookModel.createBook(testBooks['bookB']);
            bookModel.createBook(testBooks['bookC']);

            bookModel.deleteBook(testBooks['bookB'].id);

            expect(global.bookCatalog.length).toBe(2);
            expect(global.bookCatalog).toContain(testBooks['bookA']);
            expect(global.bookCatalog).toContain(testBooks['bookC']);
        });

        test('throw exception when deleting a book that does not exist', () => {
            const bookModel = new BookModel();        
            expect(() => bookModel.deleteBook(testBooks['bookA'].id)).toThrow('Book not found');
        });
    });
});
