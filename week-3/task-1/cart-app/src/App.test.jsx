import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Helper to add an item by name
const addItemByName = (name) => {
  const itemLis = screen.getAllByRole('listitem');
  const itemLi = itemLis.find(li => li.textContent.includes(name) && li.textContent.includes('Add'));
  const button = itemLi.querySelector('button');
  fireEvent.click(button);
};

describe('Shopping Cart App', () => {
  test('adds items to the cart and updates total', () => {
    render(<App />);
    addItemByName('Apple');
    addItemByName('Banana');
    expect(screen.getByText(/Apple - \$2 x 1/)).toBeInTheDocument();
    expect(screen.getByText(/Banana - \$1 x 1/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$3/)).toBeInTheDocument();
  });

  test('increments quantity when adding the same item again', () => {
    render(<App />);
    addItemByName('Apple');
    addItemByName('Apple');
    expect(screen.getByText(/Apple - \$2 x 2/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$4/)).toBeInTheDocument();
  });

  test('removes items from the cart', () => {
    render(<App />);
    addItemByName('Apple');
    addItemByName('Banana');
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]); // Remove Apple
    expect(screen.queryByText(/Apple - \$2 x/)).not.toBeInTheDocument();
    expect(screen.getByText(/Banana - \$1 x 1/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$1/)).toBeInTheDocument();
  });

  test('shows empty cart message and zero total when all items are removed', () => {
    render(<App />);
    addItemByName('Apple');
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);
    expect(screen.getByText(/Your cart is empty/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$0/)).toBeInTheDocument();
  });

  test('does not show remove button if cart is empty (error handling)', () => {
    render(<App />);
    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
  });

  // Error handling for adding invalid item is not possible via UI, but we can check UI does not break
  test('UI remains stable if no actions are performed', () => {
    render(<App />);
    expect(screen.getByText(/Available Items/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Shopping Cart/i })).toBeInTheDocument();
    expect(screen.getByText(/Total: \$0/)).toBeInTheDocument();
  });
});
