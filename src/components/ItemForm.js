import React, {useState} from "react";

function ItemForm({handleAddItem}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Produce',
    isInCart: false,
  })

  function handleSubmit(e){
    e.preventDefault()
    fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => handleAddItem(data))
    .catch(error => console.log(`Error adding item: ${error}`))

    setFormData({
      name: '',
      category: 'Produce',
      isInCart: false,
    })
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
