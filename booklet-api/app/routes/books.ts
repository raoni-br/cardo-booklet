import express, { Request, Response } from 'express';

export const booksRouter = express.Router();

// International Standard Book Number (ISBN)
/* GET user's books */
booksRouter.get('/', function (req: Request, res: Response) {
    res.send('respond with a resource');
});

/* GET book [id] */
booksRouter.get('/:id', function (req: Request, res: Response) {
    res.send('respond with a resource');
});

/* POST create new book */
booksRouter.post('/', function (req: Request, res: Response) {
    res.send('respond with a resource');
});

/* PUT update user's book [id] */
booksRouter.put('/:id', function (req: Request, res: Response) {
    res.send('respond with a resource');
});

/* DELETE delete user's book [id] */
booksRouter.delete('/:id', function (req: Request, res: Response) {
    res.send('respond with a resource');
});
