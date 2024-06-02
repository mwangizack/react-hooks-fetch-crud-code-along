import { response } from "msw";
import React from "react";

function Item({ item, handleUpdateItem, handleDeleteItem}) {
  function handleClick(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isInCart: !item.isInCart})
    })
    .then(response => response.json())
    .then(data => handleUpdateItem(data))
    .catch(error => console.log(`Error adding/removing from cart ${error}`))
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => console.log(`${item.name} deleted!`))
    .catch(error => console.log(`Error deleting item: ${error}`))
    handleDeleteItem(item.id)
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
