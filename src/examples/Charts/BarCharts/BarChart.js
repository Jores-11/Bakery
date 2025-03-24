import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ barChartData, barChartOptions }) => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (Array.isArray(barChartData) && barChartData.length > 0) {
      setChartData(barChartData);
    }
    if (barChartOptions && Object.keys(barChartOptions).length > 0) {
      // Sanitize xaxis type to prevent datetime errors
      const sanitizedOptions = { ...barChartOptions };
      if (
        sanitizedOptions.xaxis?.type === "datetime" &&
        sanitizedOptions.xaxis?.categories?.every(cat => typeof cat === "string" && isNaN(Date.parse(cat)))
      ) {
        sanitizedOptions.xaxis.type = "category";
      }
      setChartOptions(sanitizedOptions);
    }
  }, [barChartData, barChartOptions]);

  if (!chartData.length || !Object.keys(chartOptions).length) {
    return <div>Loading chart...</div>;
  }

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;