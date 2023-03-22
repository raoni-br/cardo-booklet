import { render } from '@testing-library/react';

import BookCatalogPage from './index';

describe('BookCatalogPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookCatalogPage />);
    expect(baseElement).toBeTruthy();
  });
});
