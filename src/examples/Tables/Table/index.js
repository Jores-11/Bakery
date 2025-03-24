import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// BakeryDashboard React components
import VuiBox from "components/VuiBox";
import VuiAvatar from "components/VuiAvatar";
import VuiTypography from "components/VuiTypography";

// BakeryDashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows }) {
  const { grey, light } = colors; // Added light for border check
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  // Ensure arrays
  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeRows = Array.isArray(rows) ? rows : [];

  console.log("Table: columns:", safeColumns); // Debug
  console.log("Table: rows:", safeRows); // Debug

  const renderColumns = safeColumns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === safeColumns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <VuiBox
        key={name || uuidv4()} // Fallback key if name is undefined
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align || "left"}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="text"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        {(name || "").toUpperCase()}
      </VuiBox>
    );
  });

  const renderRows = safeRows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = safeColumns.map(({ name, align }) => {
      const cellValue = row[name];
      let template;

      if (Array.isArray(cellValue)) {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <VuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <VuiBox mr={2}>
                <VuiAvatar
                  src={cellValue[0] || ""}
                  name={cellValue[1] || "Unknown"}
                  variant="rounded"
                  size="sm"
                />
              </VuiBox>
              <VuiTypography
                color="white"
                variant="button"
                fontWeight="medium"
                sx={{ width: "max-content" }}
              >
                {cellValue[1] || "N/A"}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        );
      } else {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align || "left"}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${grey[700]}` : null}
          >
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {cellValue !== undefined ? cellValue : "N/A"}
            </VuiTypography>
          </VuiBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <VuiBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </VuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [safeColumns, safeRows] // Dependency array updated
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      align: PropTypes.oneOf(["left", "center", "right"]),
      width: PropTypes.string,
    })
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;