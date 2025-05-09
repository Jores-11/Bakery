

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// Bakery Dashboard React components
import VuiBox from "components/VuiBox";

// Custom styles for the VuiAlert
import VuiAlertRoot from "components/VuiAlert/VuiAlertRoot";
import VuiAlertCloseIcon from "components/VuiAlert/VuiAlertCloseIcon";

function VuiAlert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <VuiAlertRoot ownerState={{ color }} {...rest}>
        <VuiBox display="flex" alignItems="center" color="white">
          {children}
        </VuiBox>
        {dismissible ? (
          <VuiAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</VuiAlertCloseIcon>
        ) : null}
      </VuiAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of VuiAlert
VuiAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the VuiAlert
VuiAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default VuiAlert;
