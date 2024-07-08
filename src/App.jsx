import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FinishedTasks from './components/FinishedTasks';
import TasksChart from './components/TasksChart'; // Import your updated TasksChart component
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    let todoToUpdate = todos.find(item => item.id === id);
    if (todoToUpdate) {
      setTodo(todoToUpdate.todo);
      let updatedTodos = todos.filter(item => item.id !== id);
      setTodos(updatedTodos);
      saveToLocalStorage();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      let updatedTodos = todos.filter(item => item.id !== id);
      setTodos(updatedTodos);
      saveToLocalStorage();
    }
  };

  const handleAdd = () => {
    if (todo.trim().length > 0) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      saveToLocalStorage();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    let updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted, completedAt: item.isCompleted ? null : moment().toISOString() } : item
    );
    setTodos(updatedTodos);
    saveToLocalStorage();
  };

  const handleRestore = (id) => {
    let todoToRestore = todos.find(item => item.id === id);
    if (todoToRestore) {
      todoToRestore.isCompleted = false;
      todoToRestore.completedAt = null;
      setTodos([...todos.filter(item => item.id !== id), todoToRestore]);
      saveToLocalStorage();
    }
  };

  // Calculate total tasks and finished tasks
  const totalTasks = todos.length;
  const finishedTasks = todos.filter(todo => todo.isCompleted).length;

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar setShowFinished={setShowFinished} />
      <div className="sm:container mx-auto my-10 rounded-lg p-6 bg-gray-800 shadow-lg max-w-screen-md">
        <div className="mb-6">
          <h2 className='text-3xl font-bold text-white mb-4'>Check off your tasks, Checkmate your day.</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              className='flex-1 px-4 py-3 rounded-l-md bg-gray-700 text-white focus:outline-none focus:bg-gray-700'
              placeholder="Enter your todo..."
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className='ml-2 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-r-md text-white font-semibold disabled:bg-green-400'
            >
              Save
            </button>
          </div>
        </div>
        {showFinished ? (
          <FinishedTasks
            todos={todos}
            handleDelete={handleDelete}
            handleRestore={handleRestore}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {todos.filter(item => !item.isCompleted).map(item => (
              <div key={item.id} className="bg-gray-700 rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckbox(item.id)}
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                  <p className={`ml-3 text-white ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white font-semibold'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold'
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6">
          <TasksChart totalTasks={totalTasks} finishedTasks={finishedTasks} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
