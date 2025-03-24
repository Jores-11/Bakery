// @mui material components
import Card from "@mui/material/Card";

// Bakery Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// React icons
import { BsCheckCircleFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { SiDropbox } from "react-icons/si";

// Bakery Dashboard React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import AdobeXD from "examples/Icons/AdobeXD";

// Bakery Dashboard theme imports
import palette from "assets/theme/base/colors";

function OrderOverview() {
  console.log("OrderOverview rendered"); // Debugging

  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Orders overview
        </VuiTypography>
        <VuiBox mb={2}>
          <VuiBox display="flex" alignItems="center">
            <BsCheckCircleFill color="green" size="15px" mr="5px" />
            <VuiTypography variant="button" color="text" fontWeight="medium" ml="5px" mr="2px">
              +30%
            </VuiTypography>{" "}
            <VuiTypography variant="button" color="text" fontWeight="regular">
              this month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        {TimelineItem ? (
          <>
            <TimelineItem
              icon={<FaBell size="16px" color={palette.info.main} />}
              title="$2400, Design changes"
              dateTime="09 MARCH 7:20 PM"
            />
            <TimelineItem
              icon={<IoLogoCss3 size="16px" color={palette.error.main} />}
              title="New order From Hermas"
              dateTime="2 MARCH 11 PM"
            />
            <TimelineItem
              icon={<FaShoppingCart size="16px" color={palette.lightblue.main} />}
              title="Server payments for MARCH"
              dateTime="1 MARCH 9:34 PM"
            />
            <TimelineItem
              icon={<BsCreditCardFill size="16px" color={palette.warning.main} />}
              title="New card added for order"
              dateTime="3 MARCH 2:20 AM"
            />
            <TimelineItem
              icon={<SiDropbox size="16px" color={palette.primary.focus} />}
              title="New card added for order "
              dateTime="8 MARCH 4:54 AM"
            />
            <TimelineItem
              icon={<AdobeXD size="20px" />}
              title="New order "
              dateTime="7 MARCH"
            />
          </>
        ) : (
          <VuiTypography color="white">TimelineItem unavailable</VuiTypography>
        )}
      </VuiBox>
    </Card>
  );
}

export default OrderOverview;