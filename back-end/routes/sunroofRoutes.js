const mongoose = require("mongoose");
const express = require("express");
const axios = require('axios');
const router = require("./routes");

const app = express();
const PORT = 5001;


const cors = require("cors"); // Import the cors package
// const BuildingInsights = require("./models/buildinginsight");
require('dotenv').config();



app.use(express.json());
app.use(cors());
app.use("/api/v1", router);


const uri = "mongodb+srv://Moe:Mamakadia@cluster0.skekizd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDb() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (error) {
        console.log("Error: " + error);
        await mongoose.disconnect();
    }
}

app.listen(PORT, async () => {
    await connectDb().catch(console.dir);
    console.log('Express API started: http://localhost:${PORT}');
});

async function getSolarData() {
    try {
        const response = await fetch('https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=37.2746464&location.longitude=-121.7530949&key=yourAPIkey');
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching solar/api:', error);
        return [];
    }
}

getSolarData('your-api-key', 'your-location').then(data => {
    console.log(data);
});

module.exports = getSolarData;