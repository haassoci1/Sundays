import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    firstOrder: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      address: formData.address
    };

    console.log("User data: ", user);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', user, { withCredentials: true });
      console.log("Server response: ", res);
      if (res && res.data && res.data.token) {
        console.log("Token received: ", res.data.token);
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        console.error('Invalid response from server', res);
      }
    } catch (err) {
      console.error('Error during registration', err.response ? err.response.data : err.message);
    }
  };

  switch (step) {
    case 1:
      return (
        <form onSubmit={handleSubmit}>
          <h2>Step 1: Personal Information</h2>
          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <button type="button" onClick={nextStep}>Next</button>
        </form>
      );
    case 2:
      return (
        <form onSubmit={handleSubmit}>
          <h2>Step 2: Address</h2>
          <input name="address" placeholder="Address" onChange={handleChange} />
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
        </form>
      );
    case 3:
      return (
        <form onSubmit={handleSubmit}>
          <h2>Step 3: First Order</h2>
          <input name="firstOrder" placeholder="First Order" onChange={handleChange} />
          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Submit</button>
        </form>
      );
    default:
      return null;
  }
};

export default SignUp;
