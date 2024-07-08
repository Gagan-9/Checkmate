// AddTaskCard.jsx
import React from 'react';

const AddTaskCard = ({ handleAdd }) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-white text-lg font-semibold mb-2">Add Task</h3>
      <input
        type="text"
        value={todo}
        onChange={handleChange}
        className='px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:bg-gray-700'
        placeholder="Enter your todo..."
      />
      <button
        onClick={() => {
          handleAdd(todo);
          setTodo("");
        }}
        disabled={todo.length <= 3}
        className='mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold disabled:bg-green-400'
      >
        Save
      </button>
    </div>
  );
};

export default AddTaskCard;
