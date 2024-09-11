// SunshineQuantilesChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SunshineQuantilesChart = ({ sunshineQuantiles }) => {
    const data = {
        labels: sunshineQuantiles.map((_, index) => `Quantile ${index + 1}`),
        datasets: [
            {
                label: 'Sunshine Quantiles (hours)',
                data: sunshineQuantiles,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Hours: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Quantiles',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Hours',
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SunshineQuantilesChart;
