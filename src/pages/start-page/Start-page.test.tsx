import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StartPage } from './Start-page';

test('renders h1 with text Учите новые слова легко с приложением Smart Cat!', () => {
  render(
    <Router>
      <StartPage />
    </Router>
  );
  const h1Element = screen.getByText(
    /Учите новые слова легко с приложением Smart Cat!/i
  );
  expect(h1Element).toBeInTheDocument();
});

test('start button should navigate to /dashboard', () => {
  render(
    <Router>
      <StartPage />
    </Router>
  );
  expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
});
