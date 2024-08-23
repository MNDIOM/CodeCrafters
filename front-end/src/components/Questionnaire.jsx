import { useState } from 'react';

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
    roofAge: '',
    address: '',
    firstName: '',
    lastName: '',
    email: ''
  });

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

  const handleSliderChange = (e) => {
    setFormData({ ...formData, electricBill: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="questionnaire">
      {step === 1 && (
        <div>
          <h2>Enter your zip code</h2>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter your zip code"
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Choose Type</h2>
          <label>
            <input
              type="checkbox"
              name="type"
              value="Home"
              checked={formData.type.includes('Home')}
              onChange={handleCheckboxChange}
            />
            Home
          </label>
          <label>
            <input
              type="checkbox"
              name="type"
              value="Business"
              checked={formData.type.includes('Business')}
              onChange={handleCheckboxChange}
            />
            Business
          </label>
          <label>
            <input
              type="checkbox"
              name="type"
              value="Non-Profit"
              checked={formData.type.includes('Non-Profit')}
              onChange={handleCheckboxChange}
            />
            Non-Profit
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Do you own or rent?</h2>
          <label>
            <input
              type="radio"
              name="ownOrRent"
              value="Own"
              checked={formData.ownOrRent === 'Own'}
              onChange={handleChange}
            />
            I own
          </label>
          <label>
            <input
              type="radio"
              name="ownOrRent"
              value="Rent"
              checked={formData.ownOrRent === 'Rent'}
              onChange={handleChange}
            />
            I rent
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>How much is your average monthly electric bill?</h2>
          <input
            type="range"
            name="electricBill"
            min="50"
            max="1200"
            step="10"
            value={formData.electricBill}
            onChange={handleSliderChange}
          />
          <p>${formData.electricBill}</p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2>Are you interested in solar batteries?</h2>
          <label>
            <input
              type="radio"
              name="interestedInBatteries"
              value="Yes"
              checked={formData.interestedInBatteries === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="interestedInBatteries"
              value="No"
              checked={formData.interestedInBatteries === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2>What’s the main reason you want a battery?</h2>
          <label>
            <input
              type="checkbox"
              name="batteryReason"
              value="Power Backup"
              checked={formData.batteryReason.includes('Power Backup')}
              onChange={handleCheckboxChange}
            />
            For power backup
          </label>
          <label>
            <input
              type="checkbox"
              name="batteryReason"
              value="Maximize Savings"
              checked={formData.batteryReason.includes('Maximize Savings')}
              onChange={handleCheckboxChange}
            />
            Maximize savings
          </label>
          <label>
            <input
              type="checkbox"
              name="batteryReason"
              value="Self-Supply"
              checked={formData.batteryReason.includes('Self-Supply')}
              onChange={handleCheckboxChange}
            />
            Self-supply
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 7 && (
        <div>
          <h2>Would you remove trees to go solar?</h2>
          <label>
            <input
              type="radio"
              name="removeTrees"
              value="Yes"
              checked={formData.removeTrees === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="removeTrees"
              value="No"
              checked={formData.removeTrees === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 8 && (
        <div>
          <h2>Is your roof more than 20 years old?</h2>
          <label>
            <input
              type="radio"
              name="roofAge"
              value="Yes"
              checked={formData.roofAge === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="roofAge"
              value="No"
              checked={formData.roofAge === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="roofAge"
              value="Unknown"
              checked={formData.roofAge === 'Unknown'}
              onChange={handleChange}
            />
            Unknown
          </label>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 9 && (
        <div>
          <h2>Let's find your roof</h2>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          {/* You can integrate Google Maps here */}
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 10 && (
        <div>
          <h2>Enter your name</h2>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 11 && (
        <div>
          <h2>Enter your email address</h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Questionnaire;
