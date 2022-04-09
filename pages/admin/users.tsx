import React from 'react';import { useAppSelector, useAppDispatch } from '../../store';
import {
  fetchRequest,
  fetchSuccess,
  fetchError,
  deleteRequest,
  deleteSuccess,
  deleteError,
} from '../../store/adminPanelStore';
import { useRouter } from 'next/router';
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
import { useSnackbar } from 'notistack';

const AdminUsers: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    authStore: { userInfo },
    adminPanelStore: { data, error, loading },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  /**
   * @description Function to delete a user from the database.
   * @param userId id of the user.
   */
  const handleDeleteUser = async (userId: string) => {
    if (confirm(`Do you want to delete ${userId}`)) {
      dispatch(deleteRequest());
      setModalOpen(true);
      try {
        await axios.delete<{}, AppResponse<UserSchema[]>>('/api/admin/users', {
          headers: { authorization: `Bearer ${userInfo?.token}` },
          data: userId,
        });
        dispatch(
          deleteSuccess(
            (data as UserSchema[]).filter(({ _id }) => _id !== userId)
          )
        );
        setModalOpen(false);
        enqueueSnackbar(`${userId} deleted successfully`, {
          variant: 'success',
        });
      } catch (error: any) {
        const errorText = error.response.data.message || error.toString();
        setModalOpen(false);
        dispatch(deleteError(error.toString()));
        enqueueSnackbar(errorText, { variant: 'error' });
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
    if (!userInfo?.isAdmin) {
      router.push('/');
    }
    const fetchHandler = async () => {
      try {
        dispatch(fetchRequest());
        const { data } = await axios.get<{}, AppResponse<UserSchema[]>>(
          '/api/admin/users',
          {
            headers: { authorization: `Bearer ${userInfo?.token}` },
          }
        );
        dispatch(fetchSuccess(data.payload));
      } catch (error: any) {
        dispatch(fetchError(error.toString()));
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
          <Typography id="modal-description" sx={{ mt: 2 }}>
            This may take some time.
          </Typography>
          <CircularProgress />
        </Box>
      </Modal>
      <Grid container spacing={2}>
        <AdminSidebar activeTab="users" />
        <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '15px 5px',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '20px' }}>Users</Typography>
          </Box>
          <Box sx={{ height: 800, width: '100%' }}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography sx={{ color: 'red' }}>{error}</Typography>
            ) : (
              <DataGrid
                getRowId={(row) => row._id}
                rows={data}
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
