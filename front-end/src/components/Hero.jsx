// Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="hero bg-gray-100 p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg mb-8">We are excited to have you here. Explore our features and get started!</p>
        <a href="#get-started" className="btn btn-primary">Get Started</a>
      </div>
    </section>
  );
};

export default Hero;
