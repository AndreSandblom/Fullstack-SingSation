import React from 'react';
import About from '../components/About';

export default function AboutPage() {
    return (
        <div className="container">
            <div className="overlay"> {/* reuse global styling */}
                <About />
            </div>
        </div>
    );
  }