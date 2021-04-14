import React from 'react';
import { render, screen } from '@testing-library/react';
import { AboutUs } from './About-us';

describe('AboutUs', () => {
  it('should render AboutUs component', () => {
    render(<AboutUs />);
    screen.debug();
    expect(screen.getByAltText('Roman')).toBeInTheDocument();
  });
});
