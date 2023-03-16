import { Request, Response, NextFunction } from 'express';

import { Book, BookModel } from '../models/book';

export function getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const books = new BookModel().getAllBooks();
        res.send(books);
    } catch (error) {
        next(error);
    }
}

export function getBookById(req: Request, res: Response, next: NextFunction) {
    try {
        const book = new BookModel().getBookById(req.params.id);
        res.send(book);
    } catch (error) {
        next(error);
    }
}

export function createBook(req: Request, res: Response, next: NextFunction) {
    try {
        const newBook: Book = {...req.body};
        new BookModel().createBook(newBook);
        res.send('book created');
    } catch (error) {
        next(error);
    }
}

export function updateBook(req: Request, res: Response, next: NextFunction) {
    try {
        const book: Book = {...req.body};
        const updatedBook = new BookModel().updateBook(book);
        res.send(updatedBook);
    } catch (error) {
        next(error);
    }
}

export function deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
        new BookModel().deleteBook(req.params.id);
        res.send('book deleted');
    } catch (error) {
        next(error);
    }
}