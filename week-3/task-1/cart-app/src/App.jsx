import React, { useState } from 'react';
import { ITEMS } from './constants';
import ItemList from './components/ItemList.jsx';
import Cart from './components/Cart.jsx';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="App" style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#f9f9f9', borderRadius: 8 }}>
      <h1>React Shopping Cart</h1>
      <ItemList items={ITEMS} onAdd={handleAddToCart} />
      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} getTotalCost={getTotalCost} />
    </div>
  );
}

export default App;
