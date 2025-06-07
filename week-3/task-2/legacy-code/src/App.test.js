import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the LegacyCounter component
jest.mock('./component/LegacyCounter', () => {
  return function MockLegacyCounter({ initialCount, onIncrement }) {
    return (
      <div data-testid="mock-counter">
        Mock Counter: {initialCount}
        <button onClick={() => onIncrement(initialCount + 1)}>Mock Increment</button>
      </div>
    );
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  test('renders LegacyCounter with default props', () => {
    render(<App />);
    expect(screen.getByTestId('mock-counter')).toBeInTheDocument();
    expect(screen.getByText(/Mock Counter: 0/i)).toBeInTheDocument();
  });

  test('passes correct props to LegacyCounter', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<App />);
    screen.getByText('Mock Increment').click();
    expect(consoleSpy).toHaveBeenCalledWith('Count:', 1);
    consoleSpy.mockRestore();
  });

  test('renders with custom Counter component', () => {
    const CustomCounter = () => <div data-testid="custom-counter">Custom Counter</div>;
    render(<App Counter={CustomCounter} />);
    expect(screen.getByTestId('custom-counter')).toBeInTheDocument();
  });
});
