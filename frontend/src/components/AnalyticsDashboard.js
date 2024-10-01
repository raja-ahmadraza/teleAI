// components/AnalyticsDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    // Fetch analytics data from the backend
    axios.get('http://localhost:5000/api/analytics')
      .then(response => {
        setTotalOrders(response.data.totalOrders);
        setAverageOrderValue(response.data.averageOrderValue);
        setPopularItems(response.data.popularItems);
      })
      .catch(error => console.log(error));
  }, []);

  // Data for Total Orders Bar Chart
  const totalOrdersData = {
    labels: ['Total Orders'],
    datasets: [{
      label: 'Total Orders',
      data: [totalOrders],
      backgroundColor: ['#4CAF50'],
      borderColor: ['#388E3C'],
      borderWidth: 1,
    }],
  };

  // Data for Average Order Value Pie Chart
  const averageOrderValueData = {
    labels: ['Average Order Value'],
    datasets: [{
      label: 'Average Order Value',
      data: [averageOrderValue],
      backgroundColor: ['#FF6384'],
      borderColor: ['#FF6384'],
      borderWidth: 1,
    }],
  };

  // Data for Popular Items Bar Chart
  const popularItemsData = {
    labels: popularItems.map(item => item.name),
    datasets: [{
      label: 'Number of Orders',
      data: popularItems.map(item => item.count),
      backgroundColor: '#36A2EB',
      borderColor: '#2C88C9',
      borderWidth: 1,
    }],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Analytics Dashboard</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '400px', height: '300px' }}>
          <h3>Total Orders</h3>
          <Bar data={totalOrdersData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div style={{ width: '400px', height: '300px' }}>
          <h3>Average Order Value</h3>
          <Pie data={averageOrderValueData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div style={{ width: '400px', height: '300px' }}>
          <h3>Popular Items</h3>
          <Bar data={popularItemsData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

// Export the component at the top level
export default AnalyticsDashboard;
