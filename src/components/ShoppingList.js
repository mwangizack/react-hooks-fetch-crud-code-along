import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { response } from "msw";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.log(`Error fetching items: ${error}`))
  }, [])

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  function handleUpdateItem(updatedItem){
    const updatedItemsArray = items.map(item => {
      if(item.id === updatedItem.id){
        return updatedItem
      }else{
        return item
      }
    })
    setItems(updatedItemsArray)
  }

  function handleDeleteItem(id){
    const newItemsArray = items.filter(item => item.id !== id)
    setItems(newItemsArray)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleUpdateItem={handleUpdateItem} handleDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
