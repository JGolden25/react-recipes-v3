import React from 'react';

const AddRecipe = () => (
    
    <div className="App">
    <h2 className="App">Add Recipe</h2>
    <form classname="form">
      <input type="text" name="name" placeholder="Recipe Name" />
      <select
        name="category"
        
        
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      
      <input
        type="text"
        name="description"
        placeholder="Add Description"
        
      />
      <textarea
      name="instructions"
      placeholder="Add Instructions"
      
      ></textarea>
      <button type="submit" className="button-primary">
          Submit
      </button>
      </form>
            </div>
    
);

export default AddRecipe;