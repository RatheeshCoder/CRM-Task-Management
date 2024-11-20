// File: src/components/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/admin/register', {
          email: values.email,
          password: values.password,
        });
        setSuccessMessage('Admin registered successfully. Use the secret in your authenticator app.');
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Error registering admin.');
        setSuccessMessage('');
      }
    },
  });

  return (
    <div>
      <h1>Admin Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
