import React, { useState } from 'react';
import axios from 'axios';

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    orderDetails: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.post('http://localhost:5000/api/orders', formData, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Order</h2>
      <input name="orderDetails" placeholder="Order Details" onChange={handleChange} />
      <button type="submit">Create Order</button>
    </form>
  );
};

export default CreateOrder;
