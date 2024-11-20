import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies package

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

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: calc(25% - 10px);
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333333;
  text-align: center;

  &:last-child {
    margin-right: 0;
  }
`;

const Button = styled.button`
  background-color: #929090;
  width: 100%;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4e4e4e;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin-top: 8px;
`;

const OTPVerification = ({ setStep }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const refs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sendOTP = async () => {
      try {
        const loginData = JSON.parse(Cookies.get('loginData')); // Get login data from cookies
        if (loginData && loginData.email) {
          await axios.post('http://localhost:5000/api/send-otp', { email: loginData.email });
          console.log('OTP sent successfully'); // Log success message for debugging
        } else {
          setError('Login data not found. Please log in again.'); // Handle case where loginData or email is missing
        }
      } catch (error) {
        console.error('Failed to send OTP', error); // Log detailed error message for debugging
        setError('Failed to send OTP. Please try again.');
      }
    };

    sendOTP();
  }, []);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const otpCode = otp.join(''); // Joining the OTP array into a single string
      const response = await axios.post('http://localhost:5000/api/verify-otp', { otp: otpCode });
      if (response.data.success) {
        alert('Login successful');
        navigate('/homePage'); // Or redirect to a dashboard
      } else {
        setError('OTP verification failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while verifying OTP. Please try again.');
    }
  };

  const handleChangeOTP = (index, value) => {
    if (isNaN(value)) return; // Accept only numeric values
    const newOTP = [...otp];
    newOTP[index] = value.length > 1 ? value[value.length - 1] : value; // Limit input to single character
    setOtp(newOTP);

    // Move focus to the next input field
    if (index < 3 && value.length === 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      // Move focus to the previous input field when Backspace is pressed and current input is empty
      refs.current[index - 1].focus();
    }
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleVerifyOTP}>
        <InputGroup>
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChangeOTP(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              placeholder="0"
              maxLength="1"
              ref={(el) => (refs.current[index] = el)}
              required
            />
          ))}
        </InputGroup>
        <Button type="submit">Verify OTP</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormWrapper>
    </FormContainer>
  );
};

export default OTPVerification;
