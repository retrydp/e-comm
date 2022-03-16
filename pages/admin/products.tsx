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

import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';

const AdminProducts: React.FC = () => {
  const router = useRouter();
  const {
    authStore: { userInfo },
    adminPanelStore: { data, error, loading },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const columns: GridColDef[] = [
    { field: 'slug', headerName: 'Slug', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'category', headerName: 'Category', type: 'number', width: 90 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'oldPrice', headerName: 'Old Price', width: 100 },
    { field: 'color', headerName: 'Color', width: 100 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'salesCount', headerName: 'Sales Count', width: 100 },
    { field: 'itemsInStock', headerName: 'In Stock', width: 100 },
  ];

  React.useEffect(() => {
    if (!userInfo?.isAdmin) {
      router.push('/');
    }
    const fetchHandler = async () => {
      try {
        dispatch(fetchRequest());
        const { data } = await axios.get('/api/admin/products', {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        });
        dispatch(fetchSuccess(data));
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
        <AdminSidebar activeTab="products" />
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
            <Typography sx={{ fontSize: '20px' }}>Products</Typography>
            <Button variant="contained" startIcon={<Add />}>
              Add product
            </Button>
          </Box>
          <Box sx={{ height: 800, width: '100%' }}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>{error}</Typography>
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

export default AdminProducts;