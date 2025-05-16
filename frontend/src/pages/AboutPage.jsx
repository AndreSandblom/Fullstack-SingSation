import React from 'react';
import About from '../components/About';

export default function AboutPage() {
    return (
      <div className="overlay"> {/* reuse global styling */}
        <h1>About SingSation</h1>
        <About />
      </div>
    );
  }