import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import {
  fetchRequest,
  fetchSuccess,
  fetchError,
} from '../../store/adminPanelStore';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import styles from '../../utils/styles';
import { Add } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminSidebar } from '../../components';
import axios from 'axios';
import { ProductResponse } from '../../utils/types';

const AdminUsers: React.FC = () => {
  const router = useRouter();
  const {
    authStore: { userInfo },
    adminPanelStore: { data, error, loading },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const columns: GridColDef[] = [
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
        const { data } = await axios.get<{}, ProductResponse>(
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
                onCellClick={({ id }) => console.log(id)}
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
