import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditStorageDialog from "./EditStorageDialog";
import AddStorageDialog from "./AddStorageDialog";
import DeleteConfirmation from "./DeleteConfirmation";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  bucketName: string;
  accountId: string;
  bucketId: string;
  bucketSecretKey: string;
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

export interface ObtainingXMLDialogProps {
  isEditDisabled: boolean;
  handleClose: () => void;
  open: boolean;
  handleAdd: (data: StorageTableRow) => void;
  handleEdit: (updatedFields: Partial<StorageTableRow>) => void;
  handleDelete: () => void;
  data: StorageTableRow;
}

function EditToolbar(props: ObtainingXMLDialogProps) {
  //const apiRef = useGridApiContext();
  const { isEditDisabled, handleClose, open, handleAdd, handleEdit, handleDelete, data, ...other } =
    props;

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  return (
    <>
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => setOpenAddDialog(true)} startIcon={<AddCircleIcon />}>
            Add
          </Button>
          <Button
            disabled={isEditDisabled}
            onClick={() => setOpenRemoveDialog(true)}
            color="error"
            startIcon={<RemoveCircleIcon />}
          >
            Remove
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            disabled={isEditDisabled}
            onClick={() => setOpenEditDialog(true)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Box>
      </GridToolbarContainer>
      <EditStorageDialog
        handleClose={() => setOpenEditDialog(false)}
        open={openEditDialog}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={data}
      />
      <AddStorageDialog
        handleClose={() => setOpenAddDialog(false)}
        open={openAddDialog}
        handleAdd={handleAdd}
      />
      <DeleteConfirmation
        handleClose={() => setOpenRemoveDialog(false)}
        open={openRemoveDialog}
        handleConfirm={handleDelete}
      />
    </>
  );
}

export default function StorageTable({
  rows,
  onEditDisabledChange,
  isEditDisabled,
  handleClose,
  open,
  handleAdd,
  handleEdit,
  handleDelete,
}: {
  rows: StorageTableRow[];
  onEditDisabledChange: (value: boolean, params: GridRowParams) => void;
} & ObtainingXMLDialogProps) {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState<StorageTableRow>(rows[0]);


  //const [isEditDisabled, setIsEditDisabled] = useState(true);

  const handleRowClick: GridEventListener<"rowClick"> = (params: GridRowParams) => {
    onEditDisabledChange(false, params);
    setSelectedRow(params.row as StorageTableRow);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        slots={{
          toolbar: () => (
            <EditToolbar
              isEditDisabled={isEditDisabled}
              handleClose={handleClose}
              open={open}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              data={selectedRow}
            />
          ),
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        onRowClick={handleRowClick} // Enable button on row click
      />
    </Box>
  );
}
