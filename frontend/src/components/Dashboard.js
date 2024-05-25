import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/create-order">Create Order</Link></li>
          <li><Link to="/payment-method">Payment Method</Link></li>
          <li><Link to="/order-history">Order History</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
