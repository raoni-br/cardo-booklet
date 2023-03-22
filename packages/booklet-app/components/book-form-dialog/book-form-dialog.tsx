import { useState, ChangeEvent, SyntheticEvent } from 'react';

// types
import { Book } from '@cardo-booklet/booklet-utils';

export interface BookFormDialogProps {
  isOpen: boolean;
  book: Book;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

function BookFormDialog(props: BookFormDialogProps) {
  const { isOpen, book, onSave, onCancel } = { ...props };

  const action = book ? 'update' : 'create';
  const [bookForm, setBookForm] = useState(book ? (book as Book) : null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBookForm({
      ...bookForm,
      [event.target.id]: event.target.value,
    });
  };

  const handleCancel = () => {
    setBookForm(null);
    onCancel();
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(bookForm);
    setBookForm(null);
  };

  return (
    <dialog id="bookDialog" className="container-fluid" open={isOpen}>
      <article>
        <header>
          {action === 'create' ? 'Creating new book' : 'Editing book'}
        </header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ISBN</label>
          <input
            disabled={action === 'update'}
            type="text"
            id="id"
            name="isbn"
            required
            minLength={4}
            value={bookForm?.id || ''}
            onChange={handleChange}
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            minLength={4}
            value={bookForm?.title || ''}
            onChange={handleChange}
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            required
            minLength={4}
            value={bookForm?.author || ''}
            onChange={handleChange}
          />

          <label htmlFor="releaseYear">Published Year</label>
          <input
            type="number"
            step={1}
            min={1500}
            max={new Date().getFullYear()}
            id="releaseYear"
            name="releaseYear"
            required
            minLength={4}
            value={bookForm?.releaseYear || ''}
            onChange={handleChange}
          />

          <button id="confirmBtn" type="submit">
            Confirm
          </button>
          <footer>
            <button className="secondary" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </form>
      </article>
    </dialog>
  );
}

export default BookFormDialog;
