import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api'; // Ensure this is correctly set up to interact with your backend.

function Signup() {
  // State for form data
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  // State for errors and success messages
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation: Ensure all fields are filled
    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // Call the signup API and pass form data
      await signup(form);
      // Redirect to login page on successful signup
      navigate('/login');
    } catch (error) {
      // Set error state for user feedback
      setError("Signup failed. Please try again.");
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Show error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
