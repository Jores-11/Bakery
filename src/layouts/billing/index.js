import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import BarChart from "examples/Charts/BarCharts/BarChart";
import DonutChart from "examples/Charts/DonutChart"; // New component

// Chart data and options for Billing
const donutChartDataBilling = [45, 30, 15, 10]; // Percentages

const donutChartOptionsBilling = {
  chart: { toolbar: { show: false } },
  labels: ["Subscriptions", "One-Time", "Refunds", "Others"],
  colors: ["#FF6F61", "#34D399", "#FBBF24", "#A78BFA"], // Coral, Teal, Yellow, Purple
  tooltip: { theme: "dark" },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: { show: true, total: { show: true, label: "Total", color: "#fff" } },
      },
    },
  },
  legend: { position: "bottom", labels: { colors: "#c8cfca" } },
};

const stackedBarChartDataBilling = [
  {
    name: "Online",
    data: [120, 150, 200, 180, 300],
  },
  {
    name: "In-Store",
    data: [80, 100, 140, 130, 200],
  },
];

const stackedBarChartOptionsBilling = {
  chart: { type: "bar", stacked: true, toolbar: { show: false } },
  tooltip: { theme: "dark" },
  xaxis: {
    categories: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    labels: { style: { colors: "#c8cfca", fontSize: "12px" } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: "#c8cfca", fontSize: "12px" } } },
  grid: { strokeDashArray: 5, borderColor: "#56577A" },
  fill: { opacity: 1 },
  colors: ["#0075FF", "#2CD9FF"], // Blue shades
  dataLabels: { enabled: false },
  plotOptions: { bar: { borderRadius: 6, columnWidth: "40%" } },
  legend: { position: "top", labels: { colors: "#c8cfca" } },
};

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <Grid container spacing={3}>
          {/* Donut Chart */}
          <Grid item xs={12} lg={6}>
            <Card>
              <VuiBox sx={{ height: "100%", p: 2 }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="10px">
                  Payment Breakdown
                </VuiTypography>
                <VuiBox sx={{ height: "400px" }}> {/* Big chart height */}
                  <DonutChart donutChartData={donutChartDataBilling} donutChartOptions={donutChartOptionsBilling} />
                </VuiBox>
              </VuiBox>
            </Card>
          </Grid>
          {/* Stacked Bar Chart */}
          <Grid item xs={12} lg={6}>
            <Card>
              <VuiBox sx={{ height: "100%", p: 2 }}>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="10px">
                  Sales by Channel
                </VuiTypography>
                <VuiBox sx={{ height: "400px" }}> {/* Big chart height */}
                  <BarChart barChartData={stackedBarChartDataBilling} barChartOptions={stackedBarChartOptionsBilling} />
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

export default Billing;