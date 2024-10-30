import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    renderCell: (cellValues) => {
      return (
        <>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            First Name{" "}
          </Typography>
        </>
      );
    },
  },
  {
    field: "date",
    headerName: "Date added",
    renderCell: (cellValues) => {
      return (
        <>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            28.6.2021{" "}
          </Typography>
        </>
      );
    },
  },
  {
    field: "connectionStatus",
    headerName: "Connection status",
    renderCell: (cellValues) => {
      return (
        <>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            12{" "}
          </Typography>
        </>
      );
    },
  },
];

export default function StorageTable({ rows }: { rows: any }) {
  return (
    <div style={{ width: "100%" }}>
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
        autoHeight
      />
    </div>
  );
}
