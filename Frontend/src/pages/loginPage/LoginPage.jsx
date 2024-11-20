// frontend/src/components/LoginPage.js

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Login from './Login';
import OTPVerification from './OTPVerification';

const LoginPage = () => {
  const [step, setStep] = useState('login');

  useEffect(() => {
    const loginData = Cookies.get('loginData');
    if (loginData) {
      setStep('otp');
    }
  }, []);

  return (
    <div>
      {step === 'login' && <Login setStep={setStep} />}
      {step === 'otp' && <OTPVerification setStep={setStep} />}
    </div>
  );
};

export default LoginPage;
