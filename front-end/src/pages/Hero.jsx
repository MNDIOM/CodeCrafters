import React from 'react';
import '../index.css'; // Adjust the path as needed

const Hero = () => {
  return (
    <section className="hero relative">
      <div className="container mx-auto text-center transform hover:scale-105 transition-all duration-500 ease-in-out z-10">
        <h1 className="text-6xl font-extrabold mb-4 futuristic-title">
          Welcome to Sunvolt
        </h1>
        <p className="text-xl mb-8 futuristic-text">
          We are excited to have you here. Explore our features and get started!
        </p>
        <a href="/questionnaire" className="neon-button px-8 py-4 text-lg font-bold text-white rounded-lg transform hover:translate-y-1 transition-all duration-300 ease-in-out">
          Get Started
        </a>
      </div>
      <div className="absolute inset-0 hero-overlay"></div>
    </section>
  );
};

export default Hero;
