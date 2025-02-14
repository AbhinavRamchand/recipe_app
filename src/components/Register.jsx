import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userPass: ''
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/l", {
      state: {
        user: user
      }
    });
  }

  return (
    <div 
      className="container d-flex justify-content-center align-items-center" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="card shadow-lg" style={{ width: '350px' }}>
        <div className="card-header text-center">
          <h2>Register</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="card-body">
            <FormControl
              autoFocus
              type="text"
              name="userName"
              placeholder="Enter your name"
              className="mb-3"
              required
              onChange={handleChange}
              value={user.userName}
            />
            <FormControl
              type="email"
              name="userEmail"
              placeholder="Enter your email"
              className="mb-3"
              required
              onChange={handleChange}
              value={user.userEmail}
            />
            <FormControl
              type="password"
              name="userPass"
              placeholder="Enter your password"
              className="mb-3"
              required
              onChange={handleChange}
              value={user.userPass}
            />
          </div>
          <div className="card-footer">
            <Button type="submit" className="w-100">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
