import { useState, useEffect } from 'react';
import axios from 'axios';
import SunshineQuantilesChart from './SunshineQuantilesChart';
import MapView from './MapView';

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
    const [loading, setLoading] = useState(false);
    const [SolarData, setSolarData] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: Array.isArray(prevData[name])
                ? checked
                    ? [...prevData[name], value]
                    : prevData[name].filter(item => item !== value)
                : []
        }));
    };

    const handleSingleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSliderChange = (e) => {
        setFormData({ ...formData, electricBill: parseInt(e.target.value, 10) });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/questionnaire', formData);
            console.log('Form submitted:', response.data);
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleAddressSubmit = async () => {
        const address = formData.address;
        setLoading(true);
        try {
            const response = await axios.post('/api/v1/SolarData', { address });
            setSolarData(response.data);
            console.log('Solar data:', response.data);
        } catch (error) {
            console.error('Error fetching solar data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (!isNextButtonDisabled()) {
            if (step === 11) {
                handleSubmit(); // Assuming step 11 is the final step
            } else {
                setStep(step + 1);
            }
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
                return formData.roofMoreThan20Years === false; // Corrected
            default:
                return false;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
            <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                {step === 1 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Enter your zip code</h2>
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="Enter your zip code"
                            className="border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Choose Type</h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="type"
                                    value="Home"
                                    checked={formData.type.includes('Home')}
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span>Home</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="type"
                                    value="Business"
                                    checked={formData.type.includes('Business')}
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span>Business</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="type"
                                    value="Non-Profit"
                                    checked={formData.type.includes('Non-Profit')}
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span>Non-Profit</span>
                            </label>
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Do you own or rent?</h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="ownOrRent"
                                    value="Own"
                                    checked={formData.ownOrRent === 'Own'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span>I own</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="ownOrRent"
                                    value="Rent"
                                    checked={formData.ownOrRent === 'Rent'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span>I rent</span>
                            </label>
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">How much is your average monthly electric bill?</h2>
                        <input
                            type="range"
                            name="electricBill"
                            min="50"
                            max="1200"
                            step="10"
                            value={formData.electricBill}
                            onChange={handleSliderChange}
                            className="w-full mb-4 accent-blue-600"
                        />
                        <p className="text-2xl font-semibold mb-4 text-gray-700">${formData.electricBill}</p>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 5 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Are you interested in solar batteries?</h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="interestedInBatteries"
                                    value="Yes"
                                    checked={formData.interestedInBatteries === 'Yes'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="interestedInBatteries"
                                    value="No"
                                    checked={formData.interestedInBatteries === 'No'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span>No</span>
                            </label>
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 6 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Why are you interested in batteries?</h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="batteryReason"
                                    value="Backup Power"
                                    checked={formData.batteryReason.includes('Backup Power')}
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span>Backup Power</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="batteryReason"
                                    value="Energy Independence"
                                    checked={formData.batteryReason.includes('Energy Independence')}
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span>Energy Independence</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="batteryReason"
                                    value="Cost Savings"
                                    checked={formData.batteryReason.includes('Cost Savings')}
                                    onChange={handleCheckboxChange}
                                    className="form-checkbox"
                                />
                                <span>Cost Savings</span>
                            </label>
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 7 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Do you need to remove any trees for solar installation?</h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="removeTrees"
                                    value="Yes"
                                    checked={formData.removeTrees === 'Yes'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="removeTrees"
                                    value="No"
                                    checked={formData.removeTrees === 'No'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span>No</span>
                            </label>
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 8 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Enter your contact information</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 9 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Enter your email</h2>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 10 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Enter your address</h2>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddressSubmit}
                            disabled={formData.address === ''}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Get Solar Data
                        </button>
                        {loading && <p className="text-gray-500 mt-4">Loading...</p>}
                        {SolarData && <div className="mt-6">
                            <MapView solarData={SolarData} />
                            <SunshineQuantilesChart data={SolarData} />
                        </div>}
                    </div>
                )}

                {step === 11 && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Check your roof condition</h2>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="roofMoreThan20Years"
                                checked={formData.roofMoreThan20Years}
                                onChange={handleSingleCheckboxChange}
                                className="form-checkbox"
                            />
                            <span>My roof is more than 20 years old</span>
                        </label>
                        <button
                            onClick={handleNext}
                            disabled={isNextButtonDisabled()}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Submit
                        </button>
                    </div>
                )}

                {submitted && (
                    <div className="transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Thank you for your submission!</h2>
                        <p className="text-gray-600">We will review your information and get back to you soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Questionnaire;
