// Home.jsx
import React from 'react';
import TasksChart from './TasksChart';
import AddTaskCard from './AddTaskCard';
import FinishedTasksCard from './FinishedTasksCard';
import ImportantDatesCard from './ImportantDatesCard';

const Home = ({ totalTasks, finishedTasks, handleAdd }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-1">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <TasksChart totalTasks={totalTasks} finishedTasks={finishedTasks} />
        </div>
      </div>
      <div className="md:col-span-1 space-y-6">
        <AddTaskCard handleAdd={handleAdd} />
        <FinishedTasksCard />
        <ImportantDatesCard />
      </div>
    </div>
  );
};

export default Home;
