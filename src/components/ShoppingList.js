import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((resp) => resp.json())
    .then((data) => setItems(data))
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(item) {
    setItems([...items,item]);
  }

  function handleUpdateItem(item) {
    const newItems = items.map((oldItem) => {
      if(oldItem.id === item.id) return item;
      return oldItem;
    })
    setItems(newItems);
  }

  function handleDeleteItem(item) {
    const newItems = items.filter((oldItem) => oldItem.id !== item.id);
    setItems(newItems);
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
