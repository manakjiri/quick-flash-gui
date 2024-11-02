import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>

          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            First Name{" "}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "date",
    headerName: "Last changed",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            28.6.2021{" "}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "chipName",
    headerName: "Chip name",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            fintel{" "}
          </Typography>
        </Box>
      );
    },
  },
];

export default function VersionTable({ rows }: { rows: any }) {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}
