import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "./AddressAutocomplete.css"; 

function AddressAutocomplete({ onAddressSelect }) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; 

  return (
    <div className="autocomplete-container">
      <GooglePlacesAutocomplete
        apiKey={apiKey} 
        onSelect={onAddressSelect}
        className="autocomplete-input"
        placeholder="Enter your address"
      />
    </div>
  );
}

export default AddressAutocomplete;
