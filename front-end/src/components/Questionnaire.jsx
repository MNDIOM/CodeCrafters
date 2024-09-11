import { useState } from 'react';
import axios from 'axios';

function Questionnaire() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: '',
    type: [],
    ownOrRent: '',
    electricBill: 50,
    interestedInBatteries: '',
    batteryReason: [],
    removeTrees: '',
    address: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter(item => item !== value)
    }));
  };

  const handleSingleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSliderChange = (e) => {
    setFormData({ ...formData, electricBill: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('/api/questionnaire', formData)
      .then(response => {
        console.log('Form submitted:', response.data);
        setSubmitted(true);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  const handleAddressSubmit = () => {
    const encodedAddress = encodeURIComponent(formData.address);
    window.location.href = `https://solar.googleapis.com/v1/buildingInsights:findClosest?address=${encodedAddress}&apikey=process.VITE_SUNROOF_API_KEY`;
  };

  const handleNext = () => {
    if (!isNextButtonDisabled()) {
      setStep(step + 1);
    }
  };

  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return !formData.zipCode;
      case 2:
        return formData.type.length === 0;
      case 3:
        return !formData.ownOrRent;
      case 4:
        return formData.electricBill === '';
      case 5:
        return !formData.interestedInBatteries;
      case 6:
        return formData.batteryReason.length === 0;
      case 7:
        return !formData.removeTrees;
      case 8:
        return !formData.firstName || !formData.lastName;
      case 9:
        return !formData.email;
      case 10:
        return !formData.address;
      default:
        return false;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://urbansolar.com/wp-content/uploads/2018/01/AdobeStock_111015998-1.jpeg')] bg-cover bg-center p-8">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white bg-opacity-90 backdrop-blur-md border border-gray-300">
        {step === 1 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Enter your zip code</h2>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter your zip code"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Choose Type</h2>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="type"
                value="Home"
                checked={formData.type.includes('Home')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Home
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="type"
                value="Business"
                checked={formData.type.includes('Business')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Business
            </label>
            <label className="block mb-4">
              <input
                type="checkbox"
                name="type"
                value="Non-Profit"
                checked={formData.type.includes('Non-Profit')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Non-Profit
            </label>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Do you own or rent?</h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="ownOrRent"
                value="Own"
                checked={formData.ownOrRent === 'Own'}
                onChange={handleChange}
                className="mr-2"
              />
              I own
            </label>
            <label className="block mb-4">
              <input
                type="radio"
                name="ownOrRent"
                value="Rent"
                checked={formData.ownOrRent === 'Rent'}
                onChange={handleChange}
                className="mr-2"
              />
              I rent
            </label>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">How much is your average monthly electric bill?</h2>
            <input
              type="range"
              name="electricBill"
              min="50"
              max="1200"
              step="10"
              value={formData.electricBill}
              onChange={handleSliderChange}
              className="w-full mb-4"
            />
            <p className="text-lg mb-4">${formData.electricBill}</p>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Are you interested in solar batteries?</h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="interestedInBatteries"
                value="Yes"
                checked={formData.interestedInBatteries === 'Yes'}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="block mb-4">
              <input
                type="radio"
                name="interestedInBatteries"
                value="No"
                checked={formData.interestedInBatteries === 'No'}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 6 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Why are you interested in solar batteries?</h2>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="batteryReason"
                value="Power Backup"
                checked={formData.batteryReason.includes('Power Backup')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Power Backup
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="batteryReason"
                value="Energy Independence"
                checked={formData.batteryReason.includes('Energy Independence')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Energy Independence
            </label>
            <label className="block mb-4">
              <input
                type="checkbox"
                name="batteryReason"
                value="Cost Savings"
                checked={formData.batteryReason.includes('Cost Savings')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Cost Savings
            </label>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 7 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Will you need to remove trees to install solar panels?</h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="removeTrees"
                value="Yes"
                checked={formData.removeTrees === 'Yes'}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="block mb-4">
              <input
                type="radio"
                name="removeTrees"
                value="No"
                checked={formData.removeTrees === 'No'}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 8 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">What’s your first name?</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">What’s your last name?</h2>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 9 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">What’s your email address?</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 10 && (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">What’s your address?</h2>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <button
              onClick={handleAddressSubmit}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300"
            >
              Find Roof Data
            </button>
            
          </div>
        )}

        {submitted && <p className="mt-4 text-green-500">Thank you for submitting!</p>}
      </div>
    </div>
  );
}

export default Questionnaire;
