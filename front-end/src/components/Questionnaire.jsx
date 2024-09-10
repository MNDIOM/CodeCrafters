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
    roofMoreThan20Years: false
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
    const apiKey = import.meta.env.VITE_SUNROOF_API_KEY; // Get the API key from .env file

    // Redirect to the Google API with the correct URL and API key
    window.location.href = `https://solar.googleapis.com/v1/buildingInsights:findClosest?address=${encodedAddress}&key=${apiKey}`;
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
      case 11:
        return formData.roofMoreThan20Years === undefined;
      default:
        return false;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://urbansolar.com/wp-content/uploads/2018/01/AdobeStock_111015998-1.jpeg')] bg-cover bg-center p-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        {step === 1 && (
          <div>
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
              className="btn btn-primary w-full"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Choose Type</h2>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="type"
                value="Home"
                checked={formData.type.includes('Home')}
                onChange={handleCheckboxChange}
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
              />
              Non-Profit
            </label>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled()}
              className="btn btn-primary w-full"
            >
              Next
            </button>
          </div>
        )}

        {/* Other steps remain the same */}

        {step === 10 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Enter your address</h2>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <button
              onClick={handleAddressSubmit}
              disabled={isNextButtonDisabled()}
              className="btn btn-primary w-full"
            >
              Let's find your roof
            </button>
          </div>
        )}

        {submitted && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Thank you for submitting the questionnaire!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Questionnaire;
