import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import {
  adminPanelFetchRequest,
  adminPanelFetchSuccess,
  adminPanelFetchError,
  adminPanelDeleteRequest,
  adminPanelDeleteSuccess,
  adminPanelDeleteError,
} from '../../store/adminPanelStore';
import {
  Box,
  CssBaseline,
  Grid,
  Typography,
  CircularProgress,
  Tooltip,
  IconButton,
  Modal,
} from '@mui/material';
import styles from '../../utils/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminSidebar } from '../../components';
import axios from 'axios';
import { AppResponse, UserSchema } from '../../utils/types';
import NextLink from 'next/link';
import { Delete, Edit } from '@mui/icons-material';
import apiRoutes from '../../constants/apiRoutes';
import notificationMessages from '../../constants/notificationMessages';
import { isAxiosError } from '../../utils/errorHandler';
import { useInform, useAccessProvider } from '../../utils/hooks';

const AdminUsers: React.FC = () => {
  const { snackbarSuccess, snackbarError } = useInform();
  const { onNotAdmin } = useAccessProvider();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const {
    adminPanelStore: { adminPanelData, adminPanelError, adminPanelLoading },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  /**
   * @description Function to delete a user from the database.
   * @param userId id of the user.
   */
  const handleDeleteUser = async (userId: string) => {
    if (confirm(`Do you want to delete ${userId}`)) {
      dispatch(adminPanelDeleteRequest());
      setModalOpen(true);
      try {
        await axios.delete<string, AppResponse<UserSchema[]>>(
          apiRoutes.ADMIN_USERS,
          {
            data: userId,
          }
        );
        dispatch(
          adminPanelDeleteSuccess(
            (adminPanelData as UserSchema[]).filter(({ _id }) => _id !== userId)
          )
        );
        setModalOpen(false);
        snackbarSuccess(notificationMessages.USER_DELETED);
      } catch (error: unknown) {
        setModalOpen(false);
        if (isAxiosError<{ message: string }>(error)) {
          const errorText = error.response?.data.message;
          dispatch(adminPanelDeleteError(errorText));
          snackbarError(errorText);
        } else {
          dispatch(adminPanelDeleteError(`Unexpected error`));
          snackbarError(`Unexpected error`);
        }
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <Box>
          <NextLink href={`/admin/user/${params.row._id}`} passHref>
            <Tooltip title="Edit" arrow>
              <IconButton aria-label="edit" color="primary">
                <Edit />
              </IconButton>
            </Tooltip>
          </NextLink>
          <Tooltip title="Delete" arrow>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDeleteUser(params.row._id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      width: 100,
    },
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'isAdmin', headerName: 'Is admin', width: 130 },
  ];

  React.useEffect(() => {
    onNotAdmin();
    const fetchHandler = async () => {
      try {
        dispatch(adminPanelFetchRequest());
        const { data } = await axios.get<null, AppResponse<UserSchema[]>>(
          apiRoutes.ADMIN_USERS
        );
        dispatch(adminPanelFetchSuccess(data.payload));
      } catch (error: unknown) {
        if (isAxiosError<{ message: string }>(error)) {
          const errorText = error.response?.data.message;
          dispatch(adminPanelFetchError(errorText));
        } else {
          dispatch(adminPanelFetchError(`Unexpected error`));
        }
      }
    };
    fetchHandler();
  }, []);

  return (
    <>
      <CssBaseline />
      <Modal
        open={modalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={styles.adminModalAddProgress}>
          <Typography id="modal-title" variant="h6" component="h2">
            Deleting user.
          </Typography>
          <Typography id="modal-description" sx={styles.mt2}>
            This may take some time.
          </Typography>
          <CircularProgress />
        </Box>
      </Modal>
      <Grid container spacing={2}>
        <AdminSidebar activeTab="users" />
        <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
          <Box sx={styles.userSidebar}>
            <Typography sx={styles.fz20}>Users</Typography>
          </Box>
          <Box sx={styles.dataGrid}>
            {adminPanelLoading ? (
              <CircularProgress />
            ) : adminPanelError ? (
              <Typography sx={styles.colorRed}>{adminPanelError}</Typography>
            ) : (
              <DataGrid
                getRowId={(row) => row._id}
                rows={adminPanelData}
                columns={columns}
                pageSize={30}
                // onCellClick={({ id }) => console.log(id)}
                rowsPerPageOptions={[50]}
                checkboxSelection={false}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminUsers;
