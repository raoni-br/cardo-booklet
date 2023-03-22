import { render } from '@testing-library/react';

import BookFormDialog from './book-form-dialog';

describe('BookFormDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookFormDialog />);
    expect(baseElement).toBeTruthy();
  });
});
