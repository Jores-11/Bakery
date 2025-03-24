import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { IoBuild } from "react-icons/io5";
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { Card } from "@mui/material";

// Sample data for the charts (customize as needed)
const productionLineChartData = [
  {
    name: "Production Output",
    data: [50, 70, 60, 90, 85, 100, 120],
  },
  {
    name: "Target",
    data: [60, 65, 70, 80, 90, 95, 110],
  },
];

const productionLineChartOptions = {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: { style: { colors: "#fff" } },
  },
  yaxis: { labels: { style: { colors: "#fff" } } },
  colors: ["#00ffcc", "#ff007a"],
  stroke: { curve: "smooth", width: 3 },
  grid: { borderColor: "#555" },
  legend: { labels: { colors: "#fff" } },
};

const productionBarChartData = [
  {
    name: "Units Produced",
    data: [400, 430, 448, 470, 540, 580, 690],
  },
];

const productionBarChartOptions = {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    labels: { style: { colors: "#fff" } },
  },
  yaxis: { labels: { style: { colors: "#fff" } } },
  colors: ["#1f8ef1"],
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "50%",
    },
  },
  grid: { borderColor: "#555" },
};

function Production() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <VuiBox display="flex" alignItems="center">
                <IoBuild size="30px" color="#fff" />
                <VuiTypography variant="h4" color="white" ml={2}>
                  Production Dashboard
                </VuiTypography>
              </VuiBox>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            {/* Line Chart: Production Output vs Target */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ height: "100%" }}>
                <VuiBox p={2}>
                  <VuiTypography variant="h6" color="white" fontWeight="bold">
                    Production Output vs Target
                  </VuiTypography>
                  <VuiBox height="400px" mt={2}>
                    <LineChart
                      lineChartData={productionLineChartData}
                      lineChartOptions={productionLineChartOptions}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            {/* Bar Chart: Units Produced */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ height: "100%" }}>
                <VuiBox p={2}>
                  <VuiTypography variant="h6" color="white" fontWeight="bold">
                    Units Produced Over Time
                  </VuiTypography>
                  <VuiBox height="400px" mt={2}>
                    <BarChart
                      barChartData={productionBarChartData}
                      barChartOptions={productionBarChartOptions}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Production; // Ensure default export