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
    window.location.href = `https://solar.googleapis.com/v1/buildingInsights:findClosest?address=${encodedAddress}&apikey=YOUR_API_KEY`;
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

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Do you own or rent?</h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="ownOrRent"
                value="Own"
                checked={formData.ownOrRent === 'Own'}
                onChange={handleChange}
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
              />
              I rent
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

        {step === 4 && (
          <div>
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
              className="btn btn-primary w-full"
            >
              Next
            </button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Are you interested in solar batteries?</h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="interestedInBatteries"
                value="Yes"
                checked={formData.interestedInBatteries === 'Yes'}
                onChange={handleChange}
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
              />
              No
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

        {step === 6 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">What’s the main reason you want a battery?</h2>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="batteryReason"
                value="Power Backup"
                checked={formData.batteryReason.includes('Power Backup')}
                onChange={handleCheckboxChange}
              />
              For power backup
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="batteryReason"
                value="Maximize Savings"
                checked={formData.batteryReason.includes('Maximize Savings')}
                onChange={handleCheckboxChange}
              />
              Maximize savings
            </label>
            <label className="block mb-4">
              <input
                type="checkbox"
                name="batteryReason"
                value="Self-Supply"
                checked={formData.batteryReason.includes('Self-Supply')}
                onChange={handleCheckboxChange}
              />
              Self-supply
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

        {step === 7 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Would you like to remove any trees or obstructions?</h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="removeTrees"
                value="Yes"
                checked={formData.removeTrees === 'Yes'}
                onChange={handleChange}
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
              />
              No
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

        {step === 8 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">What's your name?</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
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
              className="btn btn-primary w-full"
            >
              Next
            </button>
          </div>
        )}

        {step === 9 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Enter your email</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
