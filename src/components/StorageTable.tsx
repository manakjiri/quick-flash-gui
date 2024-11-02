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
    headerName: "Date added",
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
    field: "connectionStatus",
    headerName: "Connection status",
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {" "}
            ONLINE{" "}
          </Typography>
        </Box>
      );
    },
  },
];
/*const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'date', headerName: 'Date added', flex: 1 },
  { field: 'connectionStatus', headerName: 'Connection status', flex: 1 },
];*/

function EditToolbar({ isEditDisabled }: { isEditDisabled: boolean }) {
  const apiRef = useGridApiContext();

  const [openEditDialog, setOpenDialog] = useState(false);
  //const [openAddDialog, setOpenAddDialog] = useState(false);
  //const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button  onClick={handleClickOpen}>
            Add
          </Button>
          <Button
            disabled={isEditDisabled}
            onClick={handleClickOpen}
            color="error"
          >
            Remove
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            disabled={isEditDisabled}
            onClick={handleClickOpen}
          >
            Edit
          </Button>
        </Box>
      </GridToolbarContainer>
      <EditTargetDialog handleClose={handleClose} open={openEditDialog} />
    </>
    //TODO: add other popups
  );
}

export default function StorageTable({ rows }: { rows: any }) {
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
