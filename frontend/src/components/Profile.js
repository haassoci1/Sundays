import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
        const res = await axios.get('http://localhost:5000/api/auth/profile', config);
        setFormData(res.data);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    fetchProfile();
  }, []);

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
      const res = await axios.put('http://localhost:5000/api/auth/profile', formData, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <input name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} />
      <input name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} />
      <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} disabled />
      <input name="phoneNumber" value={formData.phoneNumber} placeholder="Phone Number" onChange={handleChange} />
      <input name="address" value={formData.address} placeholder="Address" onChange={handleChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
