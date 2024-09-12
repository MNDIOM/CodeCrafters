import React from 'react';
import NewSolarCalculator from '../components/NewSolarCalculator'; // Ensure this path is correct
import solarPanels from '../data/solarPanelsData'; 

const SolarInfos = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 futuristic-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="text-white">
            <h1 className="text-5xl font-bold futuristic-title mb-6">Solar Information</h1>
            <p className="text-lg leading-8 futuristic-text mb-6">
              Solar energy is a great way to power your home with renewable energy. It reduces electricity bills and lowers carbon footprints, contributing to a cleaner, more sustainable planet. Discover how solar energy can benefit you!
            </p>
            <p className="text-lg leading-8 futuristic-text mb-6">
              Learn more about how solar energy works, the technology behind it, and the environmental and financial benefits it offers.
            </p>
          </div>
          
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/k6veDQ6nWUQ"
              title="Solar Energy Explained"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg futuristic-video"
            ></iframe>
          </div>
        </div>

        <button>read more</button> <a> click here</a> <a href="https://www.example.com">https://www.energy.gov/eere/solar/how-does-solar-work</a>

        {/* Interactive Solar Calculator */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Solar Calculator</h2>
          <NewSolarCalculator />
        </section>

        {/* Solar Panel Comparison Chart */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Solar Panel Comparison</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-2 px-4 border-b">Brand</th>
                  <th className="py-2 px-4 border-b">Model</th>
                  <th className="py-2 px-4 border-b">Efficiency</th>
                  <th className="py-2 px-4 border-b">Cost per Watt</th>
                  <th className="py-2 px-4 border-b">Warranty</th>
                  <th className="py-2 px-4 border-b">Average Production</th>
                </tr>
              </thead>
              <tbody>
                {solarPanels.map((panel, index) => (
                  <tr key={index} className="bg-gray-800 hover:bg-gray-700">
                    <td className="py-2 px-4 border-b">{panel.brand}</td>
                    <td className="py-2 px-4 border-b">{panel.model}</td>
                    <td className="py-2 px-4 border-b">{panel.efficiency}</td>
                    <td className="py-2 px-4 border-b">{panel.costPerWatt}</td>
                    <td className="py-2 px-4 border-b">{panel.warranty}</td>
                    <td className="py-2 px-4 border-b">{panel.averageProduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Solar Energy Benefits Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Benefits of Solar Energy</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <ul className="list-disc list-inside text-lg text-white">
              <li>Cost savings on electricity bills</li>
              <li>Environmental benefits and reduced carbon footprint</li>
              <li>Energy independence and security</li>
            </ul>
          </div>
        </section>

        {/* Customer Testimonials or Case Studies */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Customer Testimonials</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white">"Solar energy has transformed our home. We’re saving money and doing our part for the environment!" - Alex J.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-lg text-white">
              <div className="mb-4">
                <h3 className="font-semibold">What are the benefits of solar energy?</h3>
                <p>Solar energy reduces electricity bills, lowers carbon footprint, and provides energy independence.</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold">How much does solar panel installation cost?</h3>
                <p>The cost varies based on the size of the system and your location. Contact us for a personalized quote.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Solar Map */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Solar Potential Map</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white">Explore solar potential in different areas and see where solar energy can make a difference.</p>
          </div>
        </section>

        {/* Call to Action Buttons */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Go Solar?</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Get a Quote</button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">Contact Us</button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">Schedule a Consultation</button>
          </div>
        </section>

        {/* Blog or News Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Latest News & Blog Posts</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white">Stay updated with the latest news and blog posts about solar energy and its advancements.</p>
          </div>
        </section>

        {/* Solar Installation Process Diagram */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Solar Installation Process</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white">Understand the steps involved in installing solar panels and how the process works.</p>
          </div>
        </section>

        {/* Interactive Quiz */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Is Solar Right for You?</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white">Take our interactive quiz to find out if solar energy is a good fit for your home and lifestyle.</p>
          </div>
        </section>

        {/* Energy Savings Calculator */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Calculate Your Energy Savings</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white">Use our calculator to estimate how much you can save with solar energy.</p>
          </div>
        </section>

        {/* Live Chat or Contact Form */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Have Questions?</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-white">Chat with us live or fill out our contact form, and we’ll get back to you as soon as possible.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SolarInfos;
