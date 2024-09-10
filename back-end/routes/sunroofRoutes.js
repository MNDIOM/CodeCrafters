require('dotenv').config();
const axios = require('axios');
const express = require("express");
const BuildingInsights = require('../models/buildinginsight.js');
const router = express.Router();
const apikey = process.env.SUNROOF_API_KEY;  // Correct environment variable name

// Define your route handlers

// This function already exists, keeping it as-is
async function getLongLatData(address) {
    try {
        // First API request to get LONG / Lat
        let longLatData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apikey}`);
        let lat = longLatData.data.results[0].geometry.location.lat;
        let long = longLatData.data.results[0].geometry.location.lng;

        return { lat, long };
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
    }
}


// Solar data fetching function
async function getSolarData(lat, long) {
    try {
        const response = await axios.get(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${long}&key=${apikey}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching solarapi:', error);
        return 'Error getting solar data';
    }
}

// Route to get solar data based on hardcoded address
router.get('/SolarData', async (req, res) => {
    const { lat, long } = await getLongLatData("5593 Autumn Chase Dr Columbus, OH 43232");
    const solarData = await getSolarData(lat, long);
    res.json(solarData);
});

// Route to post solar data based on user-provided address
router.post('/SolarData', async (req, res) => {
    const { address } = req.body;

    try {
        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }

        const { lat, long } = await getLongLatData(address);
        const solarData = await getSolarData(lat, long);

        res.status(200).json(solarData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch solar data' });
    }
});

// Saving building insights
router.post("/buildinginsights", async (req, res) => {
    const addressRequest = req.body;
    const buildingInsight = new BuildingInsights({ BuildingInsights: addressRequest });
    await buildingInsight.save();

    res.status(200).json({ buildingInsight });
});

// Duplicate `getLongLatData` function is not needed; keeping it just in case but fixing
// it by using the same function name and keeping consistency

// Fetching solar data layers using geoTiff
async function getDataLayers(geoTiff) {
    try {
        const response = await axios.get(`https://solar.googleapis.com/v1/solar/geoTiff:get?id=${geoTiff}&key=${apikey}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching datalayers:', error);
        return 'Error getting solar data layers';
    }
}

// Route to get data layers (example with query params)
router.get('/DataLayers', async (req, res) => {
    const { geoTiff } = req.query;  // Assuming geoTiff comes from query parameters
    const dataLayers = await getDataLayers(geoTiff);
    res.json(dataLayers);
});

// Route to post data layers (with request body)
router.post('/DataLayers', async (req, res) => {
    const { geoTiff } = req.body;  // Assuming geoTiff comes from the request body

    try {
        if (!geoTiff) {
            return res.status(400).json({ error: 'geoTiff is required' });
        }

        const dataLayers = await getDataLayers(geoTiff);

        res.status(200).json(dataLayers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch solar data layers' });
    }
});

// Test route for basic checks
router.get("/test", (req, res) => {
    res.status(200).json({ message: "good job" });
});

// Export the router
module.exports = router;









// const GoogleApiData = require('../models/GoogleApiData');
// const mongoose = require("mongoose");
// const express = require("express");
// const axios = require('axios');
// const router = express.Router();
// require('dotenv').config(); // Load environment variables from .env

// const app = express();
// const PORT = 5001;

// const cors = require("cors");
// app.use(express.json());
// app.use(cors());
// app.use("/api/v1", router);

// // Use environment variable for MongoDB URI
// const uri = process.env.MONGODB_URI;

// const clientOptions = {
//     serverApi: { version: "1", strict: true, deprecationErrors: true },
// };

// async function connectDb() {
//     try {
//         await mongoose.connect(uri, clientOptions);
//         await mongoose.connection.db.admin().command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (error) {
//         console.log("Error: " + error);
//         await mongoose.disconnect();
//     }
// }

// app.listen(PORT, async () => {
//     await connectDb().catch(console.dir);
//     console.log(`Express API started: http://localhost:${PORT}`);
// });

// async function getSolarData(address) {
//     try {
//         const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_API_KEY}`);
//         const location = geocodeResponse.data.results[0].geometry.location;

//         const solarResponse = await axios.get(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${location.lat}&location.longitude=${location.lng}&key=${process.env.GOOGLE_API_KEY}`);
//         const solarData = solarResponse.data;

//         const googleApiData = new GoogleApiData({
//             address: address,
//             location: {
//                 latitude: location.lat,
//                 longitude: location.lng,
//             },
//             solar_insights: solarData, 
//         });

//         await googleApiData.save();
//         console.log('Google API data saved:', googleApiData);

//         return googleApiData;
//     } catch (error) {
//         console.error('Error fetching or saving Google API data:', error.response ? error.response.data : error.message);
//         return null;
//     }
// }

// router.post('/fetch-solar-data', async (req, res) => {
//     const { address } = req.body;
//     const solarData = await getSolarData(address);
    
//     if (solarData) {
//         res.status(200).json(solarData);
//     } else {
//         res.status(500).json({ error: 'Failed to fetch or save solar data' });
//     }
// });

// module.exports = router;
