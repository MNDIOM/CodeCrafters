import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setAlert({ type: 'error', message: 'All fields are required.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setAlert({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setAlert({ type: 'error', message: data.message || 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url('https://cdn.prod.website-files.com/63ffe7a74ae3957641bb4e46/641330a35720b27a54a94f7f_64067211c0a34954ba79a150_solar-panels-on-green-grass-with-a-bright-sun-in-the-background.jpg.webp')` }} // Add your image address here
    >
      <h1 className="text-4xl font-bold mb-8 text-black-800 futuristic-font">Contact Us</h1>

      <form
        className="w-full max-w-lg bg-gradient-to-r from-gray-900 to-black shadow-2xl rounded-xl p-8 transform hover:scale-105 transition-all duration-300"
        onSubmit={handleSubmit}
      >
        {alert.message && (
          <div
            className={`p-4 mb-6 rounded-lg text-white ${
              alert.type === 'success' ? 'bg-green-500 neon-glow' : 'bg-red-500 neon-glow'
            }`}
          >
            {alert.message}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-cyan-400 text-sm font-bold mb-2 futuristic-label" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border border-cyan-400 rounded w-full py-2 px-3 bg-transparent text-cyan-400 leading-tight focus:outline-none focus:shadow-outline neon-border"
            id="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-cyan-400 text-sm font-bold mb-2 futuristic-label" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border border-cyan-400 rounded w-full py-2 px-3 bg-transparent text-cyan-400 leading-tight focus:outline-none focus:shadow-outline neon-border"
            id="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-cyan-400 text-sm font-bold mb-2 futuristic-label" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border border-cyan-400 rounded w-full py-2 px-3 bg-transparent text-cyan-400 leading-tight focus:outline-none focus:shadow-outline neon-border"
            id="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition-all duration-300 neon-button"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
