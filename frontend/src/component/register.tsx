import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';
import Swal from 'sweetalert2';  

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Passwords do not match.',
      });
      return;
    }

    try {
      await apiClient.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,  
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/login');
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please try again.',
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="card-title text-center">Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              className="form-control"
              placeholder="Confirm password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
