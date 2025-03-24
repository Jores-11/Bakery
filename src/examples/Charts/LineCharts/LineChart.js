import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ lineChartData, lineChartOptions }) => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (Array.isArray(lineChartData) && lineChartData.length > 0) {
      setChartData(lineChartData);
    }
    if (lineChartOptions && Object.keys(lineChartOptions).length > 0) {
      // Sanitize xaxis type to prevent datetime errors
      const sanitizedOptions = { ...lineChartOptions };
      if (
        sanitizedOptions.xaxis?.type === "datetime" &&
        sanitizedOptions.xaxis?.categories?.every(cat => typeof cat === "string" && isNaN(Date.parse(cat)))
      ) {
        sanitizedOptions.xaxis.type = "category";
      }
      setChartOptions(sanitizedOptions);
    }
  }, [lineChartData, lineChartOptions]);

  if (!chartData.length || !Object.keys(chartOptions).length) {
    return <div>Loading chart...</div>;
  }

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;