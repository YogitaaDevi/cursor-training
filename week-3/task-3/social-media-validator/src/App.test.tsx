import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders social media validator header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Social Media URL Validator/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders social media validator component', () => {
    render(<App />);
    const validatorElement = screen.getByTestId('social-media-validator');
    expect(validatorElement).toBeInTheDocument();
  });

  test('handles validation changes', () => {
    render(<App />);
    const select = screen.getByLabelText(/select platform/i);
    const input = screen.getByLabelText(/url/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Test valid URL
    fireEvent.change(select, { target: { value: 'Facebook' } });
    fireEvent.change(input, { target: { value: 'https://www.facebook.com/username' } });
    fireEvent.click(submitButton);
    expect(screen.getByTestId('success-message')).toBeInTheDocument();

    // Test invalid URL
    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(submitButton);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  test('renders with correct class names', () => {
    render(<App />);
    const appElement = screen.getByTestId('app-container');
    expect(appElement).toHaveClass('App');
    
    const headerElement = appElement.querySelector('.App-header');
    expect(headerElement).toBeInTheDocument();
  });
});
