import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Study Buddy</h1>
      <p>Your platform to find and join study groups easily.</p>
      <Link to="/signup">Sign Up</Link> or <Link to="/login">Log In</Link>
    </div>
  );
}

export default Home;
