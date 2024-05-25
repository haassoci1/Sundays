import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
        const res = await axios.get('http://localhost:5000/api/auth/payment-method', config);
        setPaymentMethod(res.data.paymentMethod);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    fetchPaymentMethod();
  }, []);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
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
      const res = await axios.put('http://localhost:5000/api/auth/payment-method', { paymentMethod }, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Method</h2>
      <input name="paymentMethod" value={paymentMethod} placeholder="Payment Method" onChange={handleChange} />
      <button type="submit">Update Payment Method</button>
    </form>
  );
};

export default PaymentMethod;
