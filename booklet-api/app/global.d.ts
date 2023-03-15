import { Book } from './models/book';

declare global {
    var bookCatalog: Book[]
}

export {};
