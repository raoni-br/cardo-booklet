import { useState } from 'react';

// types
import { Book } from '@cardo-booklet/booklet-utils';

// components
import BookFormDialog from '../book-form-dialog/book-form-dialog';

// style
import styles from './book-card.module.scss';

export interface BookCardProps {
  book: Book;
  onUpdate: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export function BookCard(props: BookCardProps) {
  const { book, onUpdate, onDelete } = { ...props };
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete(book);
  };

  const handleUpdate = (updatedBook: Book) => {
    onUpdate(updatedBook);
    setIsEditing(false);
  };

  return (
    <article>
      <header>
        <mark>{book.title}</mark>
      </header>
      <p>Author: {book.author}</p>
      <p>Published: {book.releaseYear}</p>
      <footer className={styles.cardFooter}>
        <button className="secondary" onClick={() => handleDelete()}>
          Delete
        </button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </footer>
      <BookFormDialog
        isOpen={isEditing}
        book={book}
        onSave={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    </article>
  );
}

export default BookCard;
