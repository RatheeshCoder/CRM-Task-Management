// frontend/src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.form`
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  width: 320px;

  @media (max-width: 400px) {
    width: 100%;
    padding: 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333333;
`;

const Button = styled.button`
  background-color: #1a73e8;
  color: #ffffff;
  font-size: 16px;
  width: 100%;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0d47a1;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin-top: 8px;
`;

const Login = ({ setStep }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        // Store login data in a cookie
        Cookies.set('loginData', JSON.stringify({ email, token: response.data.token }), { expires: 1 });

        // Automatically send OTP for verification
        await axios.post('http://localhost:5000/api/send-otp', { email });

        setStep('otp');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </FormGroup>
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormWrapper>
    </FormContainer>
  );
};

export default Login;
