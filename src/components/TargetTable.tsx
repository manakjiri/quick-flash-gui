import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditTargetDialog from "@/components/EditTargetDialog";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowParams,
  useGridApiContext,
  GridToolbarContainer,
} from "@mui/x-data-grid";

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
    headerName: "Time connected",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            28.6.2021 13:13{" "}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            Lispberry{" "}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "lastUsed",
    headerName: "Last used",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            15.5.2021 11:11{" "}
          </Typography>
        </Box>
      );
    },
  },
];

function EditToolbar({ isEditDisabled }: { isEditDisabled: boolean }) {
  const apiRef = useGridApiContext();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="outlined"
          disabled={isEditDisabled}
          onClick={handleClickOpen}
        >
          Edit
        </Button>
      </GridToolbarContainer>
      <EditTargetDialog handleClose={handleClose} open={openDialog} />
    </>
  );
}

export default function TargetTable({ rows }: { rows: any }) {
  const handleRowDoubleClick: GridEventListener<"rowDoubleClick"> = (
    params: GridRowParams
  ) => {
    // Handles the double click event
    console.log("Row double-clicked:", params.row);
    // TODO: Add routing
  };

  const [isEditDisabled, setIsEditDisabled] = useState(true);

  const handleRowClick: GridEventListener<"rowClick"> = (
    params: GridRowParams
  ) => {
    setIsEditDisabled(false); // Enable the Edit button on row click
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        slots={{
          toolbar: () => <EditToolbar isEditDisabled={isEditDisabled} />,
        }}
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
