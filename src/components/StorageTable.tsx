import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
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
    headerName: "Date added",
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
    field: "connectionStatus",
    headerName: "Connection status",
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            12{" "}
          </Typography>
        </Box>
      );
    },
  },
];

export default function StorageTable({ rows }: { rows: any }) {
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
