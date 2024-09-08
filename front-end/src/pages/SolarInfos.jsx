import React from 'react';

const SolarInfos = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Left side: Information Section */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Solar Information</h1>
            <p className="text-lg leading-8 text-gray-300 mb-6">
              Solar energy is a great way to power your home with renewable energy. It reduces electricity bills and lowers carbon footprints, contributing to a cleaner, more sustainable planet. Discover how solar energy can benefit you!
            </p>
            <p className="text-lg leading-8 text-gray-300">
              Learn more about how solar energy works, the technology behind it, and the environmental and financial benefits it offers.
            </p>
          </div>
          
          {/* Right side: Video Section */}
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/k6veDQ6nWUQ"
              title="Solar Energy Explained"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarInfos;
