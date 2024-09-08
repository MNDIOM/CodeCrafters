const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Google API data
const googleApiDataSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    solar_insights: {
        type: Map, // You can use a Map or a nested object depending on the API response structure
        of: String, // Adjust the value type according to the expected data type
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
const GoogleApiData = mongoose.model('GoogleApiData', googleApiDataSchema);
module.exports = GoogleApiData;
