const mongoose = require("mongoose");
const BuildingSchema = new mongoose.Schema({

    BuildingInsights: {
        type: Object,
        required: true,
    }


});
const BuildingInsights = mongoose.model("BuildingInsights", BuildingSchema);

module.exports = BuildingInsights;