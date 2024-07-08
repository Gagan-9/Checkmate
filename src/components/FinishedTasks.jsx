import React from 'react';
import { AiFillDelete, AiOutlineUndo } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import moment from 'moment';

const FinishedTasks = ({ todos, handleDelete, handleRestore }) => {
  return (
    <div>
      {todos.filter(item => item.isCompleted).map(item => (
        <div key={item.id} className="flex items-center justify-between bg-gray-700 rounded-md p-4 mb-2">
          <div className="flex items-center">
            <p className={`ml-3 text-white ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</p>
            <span className="ml-2 text-gray-400 text-sm">
              <FaRegClock className="inline-block mr-1" />
              {moment(item.completedAt).fromNow()}
            </span>
          </div>
          <div>
            <button
              onClick={() => handleRestore(item.id)} // Ensure handleRestore is correctly defined and passed from parent
              className='px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold mr-2'
            >
              <AiOutlineUndo />
            </button>
            <button
              onClick={() => handleDelete(item.id)} // Ensure handleDelete is correctly defined and passed from parent
              className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold'
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinishedTasks;
