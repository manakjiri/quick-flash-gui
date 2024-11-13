import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditTargetDialog from "@/components/EditTargetDialog";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowParams,
  useGridApiContext,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
export interface TargetTableRow {
  id: number;
  name: string;
  date: string;
  manufacturer: string;
  lastUsed: string;
}

const columns: GridColDef<TargetTableRow>[] = [
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
    headerName: "Time connected",
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
    field: "manufacturer",
    headerName: "Manufacturer",
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
    field: "lastUsed",
    headerName: "Last used",
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
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          disabled={isEditDisabled}
          onClick={handleClickOpen}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </GridToolbarContainer>
      <EditTargetDialog handleClose={handleClose} open={openDialog} />
    </>
  );
}

export default function TargetTable({
  rows,
  onEditDisabledChange,
}: {
  rows: any;
  onEditDisabledChange: (value: boolean) => void;
}) {
  const [isEditDisabled, setIsEditDisabled] = useState(true);

  const handleRowClick: GridEventListener<"rowClick"> = (params: GridRowParams) => {
    setIsEditDisabled(false); // Enable the Edit button on row click
    onEditDisabledChange(false);
  };
  const router = useRouter();
  const handleRowDoubleClick: GridEventListener<"rowDoubleClick"> = (params: GridRowParams) => {
    // Handles the double click event
    console.log("Row double-clicked:", params.row);
    router.push("/flash/final");
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
