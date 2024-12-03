import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef, useGridApiContext } from "@mui/x-data-grid";
import FilterListIcon from "@mui/icons-material/FilterList";

// Custom header rendering function
export const HeaderWithFilter = (params: { colDef: GridColDef }) => {
  const apiRef = useGridApiContext(); // Access the grid API

  const handleFilterClick = () => {
    // Opens the filter menu for the corresponding column
    const columnField = params.colDef.field;
    apiRef.current.showFilterPanel(columnField);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "normal" }}>
        {params.colDef.headerName}
      </Typography>
      <Tooltip title="Filter">
        <IconButton size="small" color="primary" onClick={handleFilterClick}>
          <FilterListIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
