import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";

// New chart data and options for Tables
const lineChartDataTables = [
  {
    name: "Daily Visitors",
    data: [120, 150, 200, 180, 300, 250, 220, 280, 350, 300, 320, 400],
  },
  {
    name: "Page Views",
    data: [80, 100, 140, 130, 200, 180, 160, 200, 250, 220, 240, 300],
  },
];

const lineChartOptionsTables = {
  chart: { toolbar: { show: false } },
  tooltip: { theme: "dark" },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 3 },
  xaxis: {
    type: "datetime",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: { style: { colors: "#c8cfca", fontSize: "12px" } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: "#c8cfca", fontSize: "12px" } } },
  legend: { show: true, position: "top", horizontalAlign: "right" },
  grid: { strokeDashArray: 5, borderColor: "#56577A" },
  fill: { type: "gradient", gradient: { shade: "dark", type: "vertical", opacityFrom: 0.7, opacityTo: 0 } },
  colors: ["#FF6F61", "#6B7280"], // Coral and Gray
};

const barChartDataTables = [
  {
    name: "Revenue",
    data: [450, 320, 180, 500, 620, 400, 350, 290, 700],
  },
];

const barChartOptionsTables = {
  chart: { toolbar: { show: false } },
  tooltip: { style: { fontSize: "12px" }, theme: "dark" },
  xaxis: {
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: { style: { colors: "#c8cfca", fontSize: "12px" } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: "#c8cfca", fontSize: "12px" } } },
  grid: { show: false },
  fill: { colors: ["#34D399"] }, // Teal
  dataLabels: { enabled: false },
  plotOptions: { bar: { borderRadius: 10, columnWidth: "20px" } },
};

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <Grid container spacing={3}>
          {/* Line Chart */}
          <Grid item xs={12} lg={6}>
            <Card>
              <VuiBox sx={{ height: "100%", p: 2 }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="10px">
                  Visitor Trends
                </VuiTypography>
                <VuiBox sx={{ height: "400px" }}> {/* Big chart height */}
                  <LineChart lineChartData={lineChartDataTables} lineChartOptions={lineChartOptionsTables} />
                </VuiBox>
              </VuiBox>
            </Card>
          </Grid>
          {/* Bar Chart */}
          <Grid item xs={12} lg={6}>
            <Card>
              <VuiBox sx={{ height: "100%", p: 2 }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="10px">
                  Monthly Revenue
                </VuiTypography>
                <VuiBox sx={{ height: "400px" }}> {/* Big chart height */}
                  <BarChart barChartData={barChartDataTables} barChartOptions={barChartOptionsTables} />
                </VuiBox>
              </VuiBox>
            </Card>
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;