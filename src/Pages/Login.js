import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../index.css';
import { useNavigate } from 'react-router-dom';

export const Login = ({setLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
      
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.vensaiinc\.com/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }

    // If there are no validation errors
    if (form.checkValidity()) {
      try {
        const response = await axios.post('http://192.168.2.148:8080/login', {
          email,
          password,
        });

      const  jwtToken = response.data;
      window.jwtToken = jwtToken;
      if (jwtToken) {
        setLoggedIn(true);
        sessionStorage.setItem('jwtToken',jwtToken);
        
      }

      console.log(jwtToken);
       navigate("/home");
      // console.log(window.jwtToken);
      } catch (error) {
        console.log(error.message);
        // Handle the error (e.g., display error message)
      }
    }
  };

  return (
    <div className='login-cover'>
      <div className='login-page'>
        <div className='logo'>
          <img src="resources/vtrack-logo.png" alt="Vtrack-Logo" />
        </div>
        <div className="login-container">
          <div className="login-form">
            <h2 className="text-center">Employee Login</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  minLength={7}
                  isInvalid={!!emailError}
                />
                <Form.Control.Feedback type="invalid">
                  {emailError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password-input">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={7}
                  isInvalid={!!passwordError}
                  className="password-input"
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
                <div className="password-toggle">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label>Show Password</label>
                </div>
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <a Style="float:right;text-decoration:none;" href='forgotPassword'>Forgot Password</a>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
