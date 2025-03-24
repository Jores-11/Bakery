import React, { useState } from "react"; // Standardized to React
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSwitch from "components/VuiSwitch";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [mails, setMails] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(135deg, #1A1E3A 0%, #2A2F5A 100%)",
      }}
    >
      <VuiBox p={3}>
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize" mb={2}>
          Platform Settings
        </VuiTypography>
        <VuiBox lineHeight={1.25}>
          <VuiTypography variant="xxs" fontWeight="medium" color="text" textTransform="uppercase" mb={1}>
            Account
          </VuiTypography>
          <VuiBox display="flex" mb="14px" alignItems="center">
            <VuiSwitch color="info" checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml={2}>
              Email me when someone fills a form
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" mb="14px" alignItems="center">
            <VuiSwitch color="info" checked={answersPost} onChange={() => setAnswersPost(!answersPost)} />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml={2}>
              Email me when someone texts me
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" mb="14px" alignItems="center">
            <VuiSwitch color="info" checked={mentionsMe} onChange={() => setMentionsMe(!mentionsMe)} />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml={2}>
              Email me when someone mentions me
            </VuiTypography>
          </VuiBox>

          <VuiTypography variant="xxs" fontWeight="medium" color="text" textTransform="uppercase" mb={1} mt={2}>
            Application
          </VuiTypography>
          <VuiBox display="flex" mb="14px" alignItems="center">
            <VuiSwitch color="info" checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml={2}>
              New launches and projects
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" mb="14px" alignItems="center">
            <VuiSwitch color="info" checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml={2}>
              Monthly product updates
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" mb="14px" alignItems="center">
            <VuiSwitch color="info" checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml={2}>
              Subscribe to newsletter
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={mails} onChange={() => setMails(!mails)} />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml={2}>
              Receive mails weekly
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default PlatformSettings;