import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';

// types
import { Book } from '@cardo-booklet/booklet-utils';

// components
import BookCard from '../../components/book-card/book-card';
import BookFormDialog from '../../components/book-form-dialog/book-form-dialog';

// style
import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface BookCatalogPageProps {}

const fetcher = () =>
  fetch('http://localhost:3001/api/books', { credentials: 'include' }).then(
    async (res) => {
      const bookCatalog: Book[] = await res.json();
      console.log('books retrieved', bookCatalog);
      return bookCatalog;
    }
  );

export function BookCatalogPage(props: BookCatalogPageProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();
  const { data: bookCatalog, error, isLoading } = useSWR('/api/books', fetcher);

  const createBook = async (newBook: Book) => {
    console.log('creating book', newBook);
    const response = await fetch('http://localhost:3001/api/books', {
      method: 'POST',
      body: JSON.stringify(newBook),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    console.log(response);
    mutate('/api/books');
  };

  const updateBook = async (updatedBook: Book) => {
    console.log('updating book', updatedBook);
    const response = await fetch(
      `http://localhost:3001/api/books/${updatedBook.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedBook),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    console.log(response);
    mutate('/api/books');
  };

  const deleteBook = async (deletedBook: Book) => {
    console.log('deleting book', deletedBook);
    const response = await fetch(
      `http://localhost:3001/api/books/${deletedBook.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    console.log(response);
    mutate('/api/books');
  };

  const getBookCards = () =>
    bookCatalog.map((book) => (
      <BookCard
        key={book.id}
        book={book}
        onDelete={deleteBook}
        onUpdate={updateBook}
      />
    ));

  return (
    <main className="container">
      <header>
        <hgroup>
          <h1>Book Catalog</h1>
          <h2>List of all books registered</h2>
        </hgroup>
        <p>
          <button
            className={styles.addButton}
            onClick={() => setIsCreating(true)}
          >
            Add Book
          </button>
        </p>
      </header>
      {error && <p>Error retrieving books</p>}
      {isLoading && (
        <a href="#" aria-busy="true">
          Retrieving books…
        </a>
      )}
      {bookCatalog && <div className={styles.bookCard}>{getBookCards()}</div>}
      <BookFormDialog
        isOpen={isCreating}
        book={null}
        onSave={createBook}
        onCancel={() => setIsCreating(false)}
      />
    </main>
  );
}

export default BookCatalogPage;
