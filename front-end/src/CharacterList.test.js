import React from 'react';
import { render } from '@testing-library/react';
import CharacterList from './CharacterList';

test('renders character list', () => {
  const { getByText } = render(<CharacterList />);
  const linkElement = getByText(/Character List/i);
  expect(linkElement).toBeInTheDocument();
});
