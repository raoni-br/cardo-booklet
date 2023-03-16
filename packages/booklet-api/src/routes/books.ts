import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';

import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/books';

export const booksRouter = express.Router();

// International Standard Book Number (ISBN)
/* GET user's books */
booksRouter.get('/', getAllBooks);

/* GET book [id] */
booksRouter.get('/:id', param('id').notEmpty(), getBookById);

/* POST create new book */
booksRouter.post(
    '/',
    body('id').notEmpty(),
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('releaseYear').notEmpty().isInt({ max: new Date().getFullYear() }),
    createBook,
);

/* PUT update user's book [id] */
booksRouter.put(
    '/:id',
    body('id').notEmpty(),
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('releaseYear').isInt({ max: new Date().getFullYear() }),
    updateBook,
);

/* DELETE delete user's book [id] */
booksRouter.delete('/:id', param('id').notEmpty(), deleteBook);
