import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import styles from '../../utils/styles';
import { ShoppingCart, People, Add } from '@mui/icons-material';
import logo from '../../public/assets/img/logo.svg';
import Image from 'next/image';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import db from '../../utils/data';

interface Items {
  title: 'products' | 'users';
  icon: JSX.Element;
  selected: boolean;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);
  const menuItemsSettings: Items[] = [
    { title: 'products', icon: <ShoppingCart />, selected: true },
    { title: 'users', icon: <People />, selected: false },
  ];
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
  });

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item sx={styles.adminSidebar} xl={2}>
          <List sx={{ width: '100%' }} disablePadding>
            <ListItem>
              <ListItemIcon>
                <Image src={logo.src} width={45} height={45} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '20px' }}>
                    E-comm Dashboard
                  </Typography>
                }
                sx={{ textTransform: 'capitalize' }}
              />
            </ListItem>
            <Divider />
            {menuItemsSettings.map(({ title, icon, selected }) => (
              <ListItem key={title} selected={selected} disablePadding>
                <ListItemButton component="a" href={`/${title}`}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
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

export default AdminDashboard;
