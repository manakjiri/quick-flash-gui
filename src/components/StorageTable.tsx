import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditStorageDialog from "./EditStorageDialog";
import AddStorageDialog from "./AddStorageDialog";
import DeleteConfirmation from "./DeleteConfirmation";

import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowParams,
  useGridApiContext,
  GridToolbarContainer,
} from "@mui/x-data-grid";

export interface StorageTableRow {
  id: number;
  name: string;
  date: string;
  connectionStatus: string;
}

const columns: GridColDef<StorageTableRow>[] = [
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
    headerName: "Date added",
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
    field: "connectionStatus",
    headerName: "Connection status",
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
/*const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'date', headerName: 'Date added', flex: 1 },
  { field: 'connectionStatus', headerName: 'Connection status', flex: 1 },
];*/

function EditToolbar({ isEditDisabled }: { isEditDisabled: boolean }) {
  const apiRef = useGridApiContext();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<GridRowParams | null>(null);

  return (
    <>
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button  onClick={() => setOpenAddDialog(true)}>
            Add
          </Button>
          <Button
            disabled={isEditDisabled}
            onClick={() => setOpenRemoveDialog(true)}
            color="error"
          >
            Remove
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            disabled={isEditDisabled}
            onClick={() => setOpenEditDialog(true)}
          >
            Edit
          </Button>
        </Box>
      </GridToolbarContainer>
      <EditStorageDialog handleClose={() => setOpenEditDialog(false)} open={openEditDialog} handleEdit={() => {}} handleDelete={() => {}} />
      <AddStorageDialog handleClose={() => setOpenAddDialog(false)} open={openAddDialog} handleAdd={() => {}}/>
      <DeleteConfirmation handleClose={() => setOpenRemoveDialog(false)} open={openRemoveDialog} handleConfirm={() => {}}/>
    </>
  );
}

export default function StorageTable({ rows }: { rows: StorageTableRow[] }) {
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
              pageSize: 5
            },
          },
        }}
        onRowClick={handleRowClick} // Enable button on row click
        onRowDoubleClick={handleRowDoubleClick} // Route to the next part of the process
      />
    </Box>
  );
}
