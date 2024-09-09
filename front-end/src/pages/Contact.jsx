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
      const response = await fetch('http://localhost:5001/api/send-message', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setAlert({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } else {
        setAlert({ type: 'error', message: data.message || 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-black-800">Contact Us</h1>
      
      <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
        {alert.message && (
          <div
            className={`p-4 mb-6 rounded-lg text-white ${
              alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {alert.message}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
