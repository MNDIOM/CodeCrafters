require('dotenv').config();
const axios = require('axios');
const express = require("express");
const BuildingInsights = require('../models/buildinginsight.js');
const router = express.Router();
const apikey = process.env.REACT_APP_SUNROOF_API_KEY

// Define your route handlers


// Define your route handlers

async function getLongLatData(address) {
    try {


        // first API request to get LONG / Lat
        let longLatData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apikey}`);
        console.log(longLatData)
        let lat = longLatData.data.results[0].geometry.location.lat
        let long = longLatData.data.results[0].geometry.location.lng

        return { lat, long }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
    }
}



async function getSolarData(lat, long) {
    try {
        const response = await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${long}&key=${apikey}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching solarapi:', error);
        return 'Error getting solar data';
    }
}



router.get('/SolarData', async (req, res) => {

    const { lat, long } = await getLongLatData("1171 Lane Ave S. Jacksonville, FL 32205")
    const SolarData = await getSolarData(lat, long)
    res.json(SolarData);
});



// router.post('/SolarData', async (req, res) => {
//     const { address } = req.body;

//     try {
//         if (!address) {
//             return res.status(400).json({ error: 'Address is required' });
//         }

//         const { lat, long } = await getLongLatData(address);
//         const SolarData = await getSolarData(lat, long);

//         res.status(200).json(SolarData);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch solar data' });
//     }
// });

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
router.post("/buildinginsights", async (req, res) => {
    const Addressrequest = req.body;
    const buildinginsight = new BuildingInsights({ BuildingInsights: Addressrequest });
    await buildinginsight.save();

    res.status(200).json({ buildinginsight });
});

// Getting dataLayers 

async function getLongLatData(address) {
    try {


        // first API request to get LONG / Lat
        let longLatData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apikey}`);
        console.log(longLatData)
        let lat = longLatData.data.results[0].geometry.location.lat
        let long = longLatData.data.results[0].geometry.location.lng

        return { lat, long }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
    }
}



async function getDataLayers(lat, long) {
    try {
        const response = await fetch(`https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${lat}&location.longitude=${long}&radiusMeters=100&view=FULL_LAYERS&requiredQuality=HIGH&exactQualityRequired=true&pixelSizeMeters=0.5&key=${apikey}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching datalayers:', error);
        return 'Error getting solar data layers';
    }
}

router.get('/DataLayers', async (req, res) => {

    const { lat, long } = await getLongLatData("1171 Lane Ave S. Jacksonville, FL 32205")
    const DataLayers = await getDataLayers(lat, long, apikey)
    res.json(DataLayers);
});

// async function getDataLayers(geoTiff) {
//     try {
//         const response = await fetch(`https://solar.googleapis.com/v1/solar/geoTiff:get?id=${geoTiff}&key=${apikey}`);
//         const data = await response.json();
//         console.log(data)
//         return data;
//     } catch (error) {
//         console.error('Error fetching datalayers:', error);
//         return 'Error getting solar data layers';
//     }
// }

// router.get('/DataLayers/', async (req, res) => {

//     const { geoTiff } = await getDataLayers(address)
//     const DataLayers = await getDataLayers(geoTiff, apikey)
//     res.json(DataLayers);
// });




router.post('/DataLayres', async (req, res) => {
    const { address } = req.body;

    try {
        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }

        const { lat, long } = await getLongLatData(address);

        const DataLayers = await getDataLayers(geoTiff, apikey)

        res.status(200).json(DataLayers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch solar data' });
    }
});

// router.get('/get-roof-measurements', async (req, res) => {
//     res.send('Roof Measurements');
// });

// router.post('/calculate-panel-size', (req, res) => {
//     const { roofArea, panelEfficiency } = req.body;
//     const size = calculatePanelSize(roofArea, panelEfficiency);
//     res.json({ panelSize: size });
// });

// router.get('/compare-bills', (req, res) => {
//     const { electricityBill, solarEnergyBill } = req.query;
//     const comparison = compareBills(electricityBill, solarEnergyBill);
//     res.json({ savings: comparison });
// });

router.get("/test", (req, res) => {
    res.status(200).json({ message: "good job" });
});

// Export the router
module.exports = router;


