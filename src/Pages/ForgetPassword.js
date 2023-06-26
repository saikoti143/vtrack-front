import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const emailPattern = /@vensaiinc\.com$/;
    if (!emailPattern.test(email)) {
      setMessage("Invalid email");
      alert('Invalid email extension');
      return;
    }
    // Make an API call to send the password reset email
    // Replace the API call with your own implementation
    // For example:
    try {
      const response = await axios.post(`http://192.168.2.148:8080/forgotpassword/${ email }`);
      console.log(response.data);
      setMessage(response.data);
      // Handle the response accordingly
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  
  };

  return (
    <div className="container">
      <h1>Enter an email to reset the Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{ maxWidth: '300px' }}
          />
        </div>
        {message && <p className="alert alert-info">{message}</p>}
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
