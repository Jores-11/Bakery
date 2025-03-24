import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Rating } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import CarInformations from "./components/CarInformations";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

const projects = [
  { name: "Website Redesign", status: "In Progress", dueDate: "2025-04-15" },
  { name: "Mobile App", status: "Completed", dueDate: "2025-02-28" },
];

function Overview() {
  const [ratings, setRatings] = useState({});
  const handleRatingChange = (projectName, newValue) => {
    setRatings((prev) => ({ ...prev, [projectName]: newValue }));
  };

  return (
    <DashboardLayout>
      <Header />
      <VuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CarInformations />
          </Grid>
         
          <Grid item xs={12} md={6} xl={3}>
            <PlatformSettings />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;