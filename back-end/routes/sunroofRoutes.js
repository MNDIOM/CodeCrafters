const GoogleApiData = require('../models/GoogleApiData');
const mongoose = require("mongoose");
const express = require("express");
const axios = require('axios');
const router = express.Router();
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = 5001;

const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

// Use environment variable for MongoDB URI
const uri = process.env.MONGODB_URI;

const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDb() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log("Error: " + error);
        await mongoose.disconnect();
    }
}

app.listen(PORT, async () => {
    await connectDb().catch(console.dir);
    console.log(`Express API started: http://localhost:${PORT}`);
});

async function getSolarData(address) {
    try {
        const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`);
        const location = geocodeResponse.data.results[0].geometry.location;

        const solarResponse = await axios.get(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${location.lat}&location.longitude=${location.lng}&key=${process.env.GOOGLE_API_KEY}`);
        const solarData = solarResponse.data;

        const googleApiData = new GoogleApiData({
            address: address,
            location: {
                latitude: location.lat,
                longitude: location.lng,
            },
            solar_insights: solarData, 
        });

        await googleApiData.save();
        console.log('Google API data saved:', googleApiData);

        return googleApiData;
    } catch (error) {
        console.error('Error fetching or saving Google API data:', error.response ? error.response.data : error.message);
        return null;
    }
}

router.post('/fetch-solar-data', async (req, res) => {
    const { address } = req.body;
    const solarData = await getSolarData(address);
    
    if (solarData) {
        res.status(200).json(solarData);
    } else {
        res.status(500).json({ error: 'Failed to fetch or save solar data' });
    }
});

module.exports = router;
