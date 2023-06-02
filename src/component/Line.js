import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Financial Inclusion Indicators",
          font: {
            size: 20,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Percentages",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={{ height: "550px", width: "900px", marginLeft: "180px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart;
