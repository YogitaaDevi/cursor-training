import React from 'react';

const Cart = ({ cartItems, onRemove, getTotalCost }) => (
  <div className="cart">
    <h2>Shopping Cart</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cartItems.map(item => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <button style={{ marginLeft: '1rem' }} onClick={() => onRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    )}
    <h3>Total: ${getTotalCost()}</h3>
  </div>
);

export default Cart; 