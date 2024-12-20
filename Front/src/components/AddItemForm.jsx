import { useState } from 'react';
import PropTypes from 'prop-types';

const AddItemForm = ({ onAddItem }) => {
  const [name, setName] = useState(''); // Track the name of the item
  const [quantity, setQuantity] = useState(1); // Track the quantity
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure the name is not empty and quantity is positive
    if (!name.trim()) {
      alert('Please enter a valid item name.');
      return;
    }
    if (quantity <= 0) {
      alert('Quantity must be greater than 0.');
      return;
    }

    // Call the parent function to add the item
    onAddItem({ name, quantity });

    // Reset the form
    setName('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col space-y-2">
        <label className="font-bold">Item Name</label>
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col space-y-2 mt-2">
        <label className="font-bold">Quantity</label>
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Item
      </button>
    </form>
  );
};

// Prop validation
AddItemForm.propTypes = {
  onAddItem: PropTypes.func.isRequired, // Function to handle adding an item
};

export default AddItemForm;
