
const mongoose = require("mongoose");

// const BuildingSchema = new mongoose.Schema({

//     name: String,
//     center: {
//         latitude: Number,
//         longitude: Number
//     },
//     imageryDate: {
//         year: Number,
//         month: Number,
//         day: Number
//     },
//     postalCode: Number,
//     administrativeArea: String,
//     statisticalArea: String,
//     regionCode: String,
//     solarPotential: {
//         maxArrayPanelsCount: Number,
//         maxArrayAreaMeters2: Number,
//         maxSunshineHoursPerYear: Number,
//         carbonOffsetFactorKgPerMwh: Number,
//         wholeRoofStats: {
//             areaMeters2: Number,
//             sunshineQuantiles: [Number],
//             groundAreaMeters2: Number
//         },
//         roofSegmentStats: [
//             {
//                 pitchDegrees: Number,
//                 azimuthDegrees: Number,
//                 stats: {
//                     areaMeters2: Number,
//                     sunshineQuantiles: [Number],
//                     groundAreaMeters2: Number
//                 },
//                 center: {
//                     latitude: Number,
//                     longitude: Number
//                 },
//                 boundingBox: {
//                     sw: {
//                         latitude: Number,
//                         longitude: Number,
//                     },
//                     ne: {
//                         latitude: Number,
//                         longitude: Number,
//                     }
//                 },
//                 planeHeightAtCenterMeters: Number
//             },

//         ],
//         solarPanelConfigs: [
//             {
//                 panelsCount: Number,
//                 yearlyEnergyDcKwh: Number,
//                 roofSegmentSummaries: [
//                     {
//                         pitchDegrees: Number,
//                         azimuthDegrees: Number,
//                         panelsCount: Number,
//                         yearlyEnergyDcKwh: Number,
//                         segmentIndex: Number
//                     }
//                 ]
//             },

//         ],
//         financialAnalyses: [
//             {
//                 monthlyBill: {
//                     currencyCode: String,
//                     units: String
//                 },
//                 panelConfigIndex: Number
//             },
//             {
//                 monthlyBill: {
//                     currencyCode: String,
//                     units: String
//                 },
//                 panelConfigIndex: Number
//             },
//             {
//                 monthlyBill: {
//                     currencyCode: String,
//                     units: String
//                 },
//                 panelConfigIndex: Number
//             },
//             {
//                 monthlyBill: {
//                     currencyCode: String,
//                     units: String
//                 },
//                 panelConfigIndex: Number,
//                 financialDetails: {
//                     initialAcKwhPerYear: Number,
//                     remainingLifetimeUtilityBill: {
//                         currencyCode: String,
//                         units: String
//                     },
//                     federalIncentive: {
//                         currencyCode: String,
//                         units: String
//                     },
//                     stateIncentive: {
//                         currencyCode: String
//                     },
//                     utilityIncentive: {
//                         currencyCode: String
//                     },
//                     lifetimeSrecTotal: {
//                         currencyCode: String
//                     },
//                     costOfElectricityWithoutSolar: {
//                         currencyCode: String,
//                         units: String
//                     },
//                     netMeteringAllowed: Boolean,
//                     solarPercentage: Number,
//                     percentageExportedToGrid: Number
//                 },
//                 leasingSavings: {
//                     leasesAllowed: Boolean,
//                     leasesSupported: Boolean,
//                     annualLeasingCost: {
//                         currencyCode: String,
//                         units: String,
//                         nanos: Number
//                     },
//                     savings: {
//                         savingsYear1: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         savingsYear20: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         presentValueOfSavingsYear20: {
//                             currencyCode: String,
//                             units: String,
//                             nanos: Number
//                         },
//                         financiallyViable: Boolean,
//                         savingsLifetime: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         presentValueOfSavingsLifetime: {
//                             currencyCode: String,
//                             units: String,
//                             nanos: Number
//                         }
//                     }
//                 },
//                 cashPurchaseSavings: {
//                     outOfPocketCost: {
//                         currencyCode: String,
//                         units: String
//                     },
//                     upfrontCost: {
//                         currencyCode: String,
//                         units: String
//                     },
//                     rebateValue: {
//                         currencyCode: String,
//                         units: String,
//                         nanos: Number
//                     },
//                     paybackYears: Number,
//                     savings: {
//                         savingsYear1: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         savingsYear20: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         presentValueOfSavingsYear20: {
//                             currencyCode: String,
//                             units: String,
//                             nanos: Number
//                         },
//                         financiallyViable: Boolean,
//                         savingsLifetime: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         presentValueOfSavingsLifetime: {
//                             currencyCode: String,
//                             units: String,
//                             nanos: Number
//                         }
//                     }
//                 },
//                 financedPurchaseSavings: {
//                     annualLoanPayment: {
//                         currencyCode: String,
//                         units: String,
//                         nanos: Number
//                     },
//                     rebateValue: {
//                         currencyCode: String
//                     },
//                     loanInterestRate: Number,
//                     savings: {
//                         savingsYear1: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         savingsYear20: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         presentValueOfSavingsYear20: {
//                             currencyCode: String,
//                             units: String,
//                             nanos: Number
//                         },
//                         financiallyViable: Boolean,
//                         savingsLifetime: {
//                             currencyCode: String,
//                             units: String
//                         },
//                         presentValueOfSavingsLifetime: {
//                             currencyCode: String,
//                             units: String,
//                             nanos: Number
//                         }
//                     }
//                 }
//             },
//         ],

//         panelCapacityWatts: Number,
//         panelHeightMeters: Number,
//         panelWidthMeters: Number,
//         panelLifetimeYears: Number,
//         buildingStats: {
//             areaMeters2: Number,
//             sunshineQuantiles: [Number],
//             groundAreaMeters2: Number
//         },
//         solarPanels: [
//             {
//                 center: {
//                     latitude: Number,
//                     longitude: Number
//                 },
//                 orientation: String,
//                 yearlyEnergyDcKwh: Number,
//                 segmentIndex: Number
//             },

//         ],
//         imageryQuality: String,
//         imageryProcessedDate: {
//             year: Number,
//             month: Number,
//             day: Number
//         }
//     }
// })


// const BuildingInsights = mongoose.model("BuildingInsights", BuildingSchema);

// module.exports = BuildingInsights;

const BuildingSchema = new mongoose.Schema({

    BuildingInsights: {
        type: Object,
        required: true,
    }


});
const BuildingInsights = mongoose.model("BuildingInsights", BuildingSchema);

module.exports = BuildingInsights;
