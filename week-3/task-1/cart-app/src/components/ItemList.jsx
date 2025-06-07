import React from 'react';

const ItemList = ({ items, onAdd }) => (
  <div className="item-list">
    <h2>Available Items</h2>
    <ul>
      {items.map(item => (
        <li key={item.id} style={{ marginBottom: '1rem' }}>
          <span>{item.name} - ${item.price}</span>
          <button style={{ marginLeft: '1rem' }} onClick={() => onAdd(item)}>Add</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ItemList; 