import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';

// Mock react-dom/client
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('Index', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders App component', () => {
    // Mock document.getElementById
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // Import index.tsx to trigger the render
    require('./index');
    
    // Check if createRoot was called with the root element
    expect(ReactDOMClient.createRoot).toHaveBeenCalledWith(root);
    
    // Check if render was called with App component
    const mockRoot = (ReactDOMClient.createRoot as jest.Mock).mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Cleanup
    document.body.removeChild(root);
  });
}); 