import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoBulb } from "react-icons/io5";
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import { Link } from "react-router-dom";
import aiImage from "assets/images/cardimgfree.png";
import { auth } from "firebase.js";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const history = useHistory();

  useEffect(() => {
    // const user = auth.currentUser;
    // if (!user) {
    //   history.push("/authentication/sign-in"); // Redirect if not logged in
    //   return;
    // }
    // user.getIdTokenResult().then((res) => {
    //   if (res.claims.role !== "ADMIN") {
    //     history.push("/authentication/sign-in"); // Redirect non-admins
    //   }
    // }).catch((error) => {
    //   console.error("Error checking role:", error);
    //   history.push("/authentication/sign-in");
    // });
  }, [history]);

  const isLineChartDataValid = Array.isArray(lineChartDataDashboard) && lineChartDataDashboard.length > 0;
  const isBarChartDataValid = Array.isArray(barChartDataDashboard) && barChartDataDashboard.length > 0;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        {/* Stats Cards */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money", fontWeight: "regular" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users", fontWeight: "regular" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients", fontWeight: "regular" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total sales", fontWeight: "regular" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>

        {/* AI-Agent and Other Cards */}
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <Card
                sx={{
                  height: "340px",
                  backgroundImage: `url(${aiImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                }}
              >
                <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between" p={3}>
                  <VuiBox display="flex" alignItems="center">
                    <IoBulb size="40px" color="#fff" />
                    <VuiTypography color="white" variant="h4" fontWeight="bold" ml={2}>
                      AI-Agent
                    </VuiTypography>
                  </VuiBox>
                  <Link to="/smart-ai">
                    <VuiTypography
                      variant="button"
                      color="white"
                      fontWeight="bold"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      Chat Now
                      <Icon sx={{ ml: "5px", fontSize: "1.125rem" }}>arrow_forward</Icon>
                    </VuiTypography>
                  </Link>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>

        {/* Charts */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Sales Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    {isLineChartDataValid ? (
                      <LineChart lineChartData={lineChartDataDashboard} lineChartOptions={lineChartOptionsDashboard} />
                    ) : (
                      <VuiTypography color="text">Sales data unavailable</VuiTypography>
                    )}
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                      borderRadius: "20px",
                    }}
                  >
                    {isBarChartDataValid ? (
                      <BarChart barChartData={barChartDataDashboard} barChartOptions={barChartOptionsDashboard} />
                    ) : (
                      <VuiTypography color="text">User data unavailable</VuiTypography>
                    )}
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <VuiBox
                        bgColor="info"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                      >
                        <IoWallet color="#fff" size="12px" />
                      </VuiBox>
                      <VuiTypography color="text" variant="button" fontWeight="medium">
                        Users
                      </VuiTypography>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32,984
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <VuiBox
                        bgColor="info"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                      >
                        <IoIosRocket color="#fff" size="12px" />
                      </VuiBox>
                      <VuiTypography color="text" variant="button" fontWeight="medium">
                        Clicks
                      </VuiTypography>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,42M
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <VuiBox
                        bgColor="info"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                      >
                        <FaShoppingCart color="#fff" size="12px" />
                      </VuiBox>
                      <VuiTypography color="text" variant="button" fontWeight="medium">
                        Sales
                      </VuiTypography>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        $2,400
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <VuiBox
                        bgColor="info"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                      >
                        <IoBuild color="#fff" size="12px" />
                      </VuiBox>
                      <VuiTypography color="text" variant="button" fontWeight="medium">
                        Items
                      </VuiTypography>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        320
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>

        {/* Camera Feed and Order Overview */}
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(135deg, #1a1a3d 0%, #2d2e5f 100%)",
                boxShadow: "0 0 20px rgba(255, 0, 122, 0.5)",
              }}
            >
              <VuiBox p={3}>
                <VuiTypography variant="h5" color="white" fontWeight="bold" mb="16px">
                  Live Bakery Camera Feed
                </VuiTypography>
                <VuiBox
                  component="iframe"
                  src="https://www.google.com/maps"
                  width="100%"
                  height="300px"
                  sx={{ borderRadius: "12px", border: "none" }}
                  title="Bakery Camera Feed"
                  allow="autoplay; encrypted-media"
                />
                <VuiTypography variant="button" color="text" mt="8px">
                  Monitor your bakery from anywhere!
                </VuiTypography>
              </VuiBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;