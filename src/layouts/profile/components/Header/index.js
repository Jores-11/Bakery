import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import breakpoints from "assets/theme/base/breakpoints";
import VuiAvatar from "components/VuiAvatar";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import burceMars from "assets/images/avatar-simmmple.png";
import { IoCube, IoDocument, IoBuild } from "react-icons/io5";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.lg
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <VuiBox position="relative"> {/* Removed ml offset */}
      <DashboardNavbar light />
      <Card
        sx={{
          px: 3,
          mt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              gap: "16px",
            },
            [breakpoints.up("xs")]: {
              gap: "0px",
            },
            [breakpoints.up("xl")]: {
              gap: "0px",
            },
          })}
        >
          <Grid
            item
            xs={12}
            md={1.7}
            lg={1.5}
            xl={1.2}
            xxl={0.8}
            display="flex"
            sx={({ breakpoints }) => ({
              [breakpoints.only("sm")]: {
                justifyContent: "center",
                alignItems: "center",
              },
            })}
          >
            <VuiAvatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item xs={12} md={4.3} lg={4} xl={3.8} xxl={7}>
            <VuiBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              display="flex"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                [breakpoints.only("sm")]: {
                  justifyContent: "center",
                  alignItems: "center",
                },
              })}
            >
              <VuiTypography variant="lg" color="white" fontWeight="bold">
                Ngong Arnold
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                Ngongarnold@gmail.com
              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6.5} xl={6} xxl={4} sx={{ ml: "auto" }}>
            <AppBar position="static" sx={{ background: "transparent" }}>
              <VuiBox
                display="flex"
                justifyContent="flex-end"
                flexDirection={tabsOrientation === "vertical" ? "column" : "row"}
                gap={2}
              >
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <VuiBox display="flex" alignItems="center" gap={1}>
                    <IoCube color="white" size="16px" />
                    <VuiTypography color="white" variant="button">
                      OVERVIEW
                    </VuiTypography>
                  </VuiBox>
                </Link>
                <Link to="/teams" style={{ textDecoration: "none" }}>
                  <VuiBox display="flex" alignItems="center" gap={1}>
                    <IoDocument color="white" size="16px" />
                    <VuiTypography color="white" variant="button">
                      TEAMS
                    </VuiTypography>
                  </VuiBox>
                </Link>
                <Link to="/projects" style={{ textDecoration: "none" }}>
                  <VuiBox display="flex" alignItems="center" gap={1}>
                  </VuiBox>
                </Link>
              </VuiBox>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;