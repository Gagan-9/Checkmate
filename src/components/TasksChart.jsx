import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TasksChart = ({ totalTasks, finishedTasks }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing chart instance
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Total Tasks', 'Finished Tasks'],
          datasets: [{
            label: 'Tasks Overview',
            data: [totalTasks, finishedTasks],
            backgroundColor: ['#4CAF50', '#2196F3'], // Green for total tasks, blue for finished tasks
            hoverOffset: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Disable default maintainAspectRatio
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup on unmount
      }
    };
  }, [totalTasks, finishedTasks]);

  return <canvas ref={chartRef} style={{ maxWidth: '300px', margin: '0 auto' }}></canvas>; // Adjust canvas style for size
};

export default TasksChart;
