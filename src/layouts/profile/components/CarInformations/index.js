import React from "react";
import { Card, Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import GreenLightning from "assets/images/shapes/green-lightning.svg";
import WhiteLightning from "assets/images/shapes/white-lightning.svg";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";
import carProfile from "assets/images/shapes/car-profile.svg";
import LineChart from "examples/Charts/LineCharts/LineChart";
import { lineChartDataProfile1, lineChartDataProfile2 } from "variables/charts";
import { lineChartOptionsProfile1, lineChartOptionsProfile2 } from "variables/charts";
import CircularProgress from "@mui/material/CircularProgress";

const CarInformations = () => {
  const { gradients, info } = colors;
  const { cardContent } = gradients;

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      <VuiBox display="flex" flexDirection="column" p={3}>
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="6px">
          Dashboard Insights
        </VuiTypography>
        <VuiTypography variant="button" color="text" fontWeight="regular" mb="30px">
          Hello, Tiomela Laurelle! Your Dashboard is ready to shine.
        </VuiTypography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={3}>
            <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress variant="determinate" value={60} size={170} color="info" />
              <VuiBox
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <VuiBox component="img" src={GreenLightning} />
                <VuiTypography color="white" variant="h2" mt="6px" fontWeight="bold" mb="4px">
                  68%
                </VuiTypography>
                <VuiTypography color="text" variant="caption">
                  Current Load
                </VuiTypography>
              </VuiBox>
            </VuiBox>
            <VuiBox textAlign="center" mt={2}>
              <VuiTypography color="white" variant="lg" fontWeight="bold" mb="2px">
                0h 58 min
              </VuiTypography>
              <VuiTypography color="text" variant="button" fontWeight="regular">
                Time For Customers To Login
              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={8} xl={9}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <VuiBox
                  display="flex"
                  p={2}
                  alignItems="center"
                  sx={{
                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                    borderRadius: "20px",
                    minHeight: "110px",
                  }}
                >
                  <VuiBox display="flex" flexDirection="column" mr="auto">
                    <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                      Profit Week
                    </VuiTypography>
                    <VuiTypography color="white" variant="h4" fontWeight="bold">
                      76%
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      background: info.main,
                      borderRadius: "12px",
                      width: "56px",
                      height: "56px",
                    }}
                  >
                    <VuiBox component="img" src={carProfile} />
                  </VuiBox>
                </VuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <VuiBox
                  display="flex"
                  p={2}
                  alignItems="center"
                  sx={{
                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                    borderRadius: "20px",
                    minHeight: "110px",
                  }}
                >
                  <VuiBox display="flex" flexDirection="column" mr="auto">
                    <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                      Efficiency
                    </VuiTypography>
                    <VuiTypography color="white" variant="h4" fontWeight="bold">
                      +20%
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ maxHeight: "75px" }}>
                    <LineChart
                      lineChartData={lineChartDataProfile1}
                      lineChartOptions={lineChartOptionsProfile1}
                    />
                  </VuiBox>
                </VuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <VuiBox
                  display="flex"
                  p={2}
                  alignItems="center"
                  sx={{
                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                    borderRadius: "20px",
                    minHeight: "110px",
                  }}
                >
                  <VuiBox display="flex" flexDirection="column" mr="auto">
                    <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                      Consumption
                    </VuiTypography>
                    <VuiTypography color="white" variant="h4" fontWeight="bold">
                      16%
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      background: info.main,
                      borderRadius: "12px",
                      width: "56px",
                      height: "56px",
                    }}
                  >
                    <VuiBox component="img" src={WhiteLightning} />
                  </VuiBox>
                </VuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <VuiBox
                  display="flex"
                  p={2}
                  alignItems="center"
                  sx={{
                    background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                    borderRadius: "20px",
                    minHeight: "110px",
                  }}
                >
                  <VuiBox display="flex" flexDirection="column" mr="auto">
                    <VuiTypography color="text" variant="caption" fontWeight="medium" mb="2px">
                      This Week
                    </VuiTypography>
                    <VuiTypography color="white" variant="h4" fontWeight="bold">
                      12M
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ maxHeight: "75px" }}>
                    <LineChart
                      lineChartData={lineChartDataProfile2}
                      lineChartOptions={lineChartOptionsProfile2}
                    />
                  </VuiBox>
                </VuiBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
};

export default CarInformations;