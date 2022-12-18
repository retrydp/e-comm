import React from 'react';
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
import {
  useInform,
  useAccessProvider,
  useFetchHandler,
} from '../../utils/hooks';

const AdminUsers: React.FC = () => {
  const { snackbarSuccess, snackbarError } = useInform();
  const { onNotAdmin } = useAccessProvider();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const {
    fetchData,
    fetchError,
    isLoading,
    setFetchData,
    setFetchError,
    setIsLoading,
  } = useFetchHandler<UserSchema[]>();
  /**
   * @description Function to delete a user from the database.
   * @param userId id of the user.
   */
  const handleDeleteUser = async (userId: string) => {
    if (confirm(`Do you want to delete ${userId}`)) {
      setIsLoading(true);
      setModalOpen(true);
      try {
        await axios.delete<string, AppResponse<UserSchema[]>>(
          apiRoutes.ADMIN_USERS,
          {
            data: userId,
          }
        );
        setFetchData((prev) => prev.filter(({ _id }) => _id !== userId));
        setIsLoading(false);
        setModalOpen(false);
        snackbarSuccess(notificationMessages.USER_DELETED);
      } catch (error: unknown) {
        setModalOpen(false);
        setIsLoading(false);
        if (isAxiosError<{ message: string }>(error)) {
          const errorText = error.response?.data.message;
          setFetchError(errorText);
          snackbarError(errorText);
        } else {
          setFetchError(`Unexpected error`);
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
        setIsLoading(true);
        const { data } = await axios.get<null, AppResponse<UserSchema[]>>(
          apiRoutes.ADMIN_USERS
        );
        setFetchData(data.payload);
        setIsLoading(false);
        setFetchError('');
      } catch (error: unknown) {
        setIsLoading(false);
        if (isAxiosError<{ message: string }>(error)) {
          const errorText = error.response?.data.message;
          setFetchError(errorText);
        } else {
          setFetchError(`Unexpected error`);
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
            {isLoading ? (
              <CircularProgress />
            ) : fetchError ? (
              <Typography sx={styles.colorRed}>{fetchError}</Typography>
            ) : (
              <DataGrid
                getRowId={(row) => row._id}
                rows={fetchData}
                columns={columns}
                pageSize={30}
                // onCellClick={({ id }) => console.log(id)}
                rowsPerPageOptions={[30]}
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
