import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowParams,
  useGridApiContext,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

export interface FirmwareTableRow {
  id: number;
  name: string;
  date: string;
}

const columns: GridColDef<FirmwareTableRow>[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>

          <Typography variant="body2" sx={{ ml: 1 }}>
          {cellValues.value}
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
          {cellValues.value}
          </Typography>
        </Box>
      );
    },
  },
];

export default function FirmwareTable({ rows, onEditDisabledChange }: { rows: any, onEditDisabledChange: (value: boolean) => void }) {
  const [isEditDisabled, setIsEditDisabled] = useState(true);

  const handleRowClick: GridEventListener<"rowClick"> = (
    params: GridRowParams
  ) => {
    setIsEditDisabled(false); // Enable the Edit button on row click
    onEditDisabledChange(false);
  };

  const router = useRouter();
  const handleRowDoubleClick: GridEventListener<"rowDoubleClick"> = (
    params: GridRowParams
  ) => {
    // Handles the double click event
    console.log("Row double-clicked:", params.row);
    router.push('/flash/version');
  };

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
        onRowClick={handleRowClick} // Enable button on row click
        onRowDoubleClick={handleRowDoubleClick} // Route to the next part of the process
      />
    </Box>
  );
}
