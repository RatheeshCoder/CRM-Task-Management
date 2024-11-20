import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MixedChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Sample student mark data
  const studentData = {
    labels: ["Math", "Science", "English", "History"],
    datasets: [
      {
        label: "Class Average",
        type: "line",
        borderColor: "#8e5ea2",
        data: [75, 82, 78, 85],
        fill: false
      },
      {
        label: "Student Score",
        type: "line",
        borderColor: "#3e95cd",
        data: [80, 85, 75, 90],
        fill: false
      },
      {
        label: "Class Average",
        type: "bar",
        backgroundColor: "rgba(142, 94, 162, 0.2)",
        data: [75, 82, 78, 85],
      },
      {
        label: "Student Score",
        type: "bar",
        backgroundColor: "rgba(62, 149, 205, 0.2)",
        hoverBackgroundColor: "#3e95cd",
        data: [80, 85, 75, 90]
      }
    ]
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: 'bar',
      data: studentData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Student Performance Comparison'
          },
          legend: { display: false }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MixedChart;