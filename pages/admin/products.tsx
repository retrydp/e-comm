import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { useRouter } from 'next/router';
import { Box, Button, CssBaseline, Grid, Typography } from '@mui/material';
import styles from '../../utils/styles';
import { ShoppingCart, People, Add } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import db from '../../utils/data';
import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';

interface Items {
  title: 'products' | 'users';
  icon: JSX.Element;
  selected: boolean;
}

const AdminProducts: React.FC = () => {
  const router = useRouter();
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);

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
      router.push('/login');
    }

    axios
      .get(`/api/admin/products`, {
        headers: { authorization: `Bearer ${userInfo?.token}` },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response.message));
  });

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <AdminSidebar activeTab="products" />
        <Grid item xl={9}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '15px 0px',
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
            <DataGrid
              getRowId={(row) => row.slug}
              rows={db.products}
              columns={columns}
              pageSize={30}
              onCellClick={({ id }) => console.log(id)}
              rowsPerPageOptions={[50]}
              checkboxSelection={false}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminProducts;
