import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
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
  Button,
  CssBaseline,
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Modal,
  Avatar,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import styles from '../../utils/styles';
import { Add } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import NextLink from 'next/link';
import { AdminSidebar } from '../../components';
import axios from 'axios';
import { AppResponse, ProductSchema } from '../../utils/types';
import { useSnackbar } from 'notistack';

const AdminProducts: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    authStore: { userInfo },
    adminPanelStore: { data, error, loading },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  /**
   * @description Function to delete a product from the database.
   * @param {string} productSlug value of the product.
   */
  const handleDeleteProduct = async (productSlug: string) => {
    if (confirm(`Do you want to delete ${productSlug}`)) {
      dispatch(deleteRequest());
      setModalOpen(true);
      try {
        await axios.delete<{}, AppResponse<ProductSchema[]>>(
          '/api/admin/products',
          {
            headers: { authorization: `Bearer ${userInfo?.token}` },
            data: productSlug,
          }
        );
        dispatch(
          deleteSuccess(
            (data as ProductSchema[]).filter(({ slug }) => slug !== productSlug)
          )
        );
        setModalOpen(false);
        enqueueSnackbar(`${productSlug} deleted successfully`, {
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
          <NextLink href={`/admin/product/${params.row.slug}`} passHref>
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
              onClick={() => handleDeleteProduct(params.row.slug)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ), //params.row.slug
      width: 100,
    },
    {
      field: 'pic',
      headerName: 'Image',
      align: 'center',
      renderCell: (params) => (
        <Avatar
          alt={params.row.name}
          src={params.row.images[0]}
          sx={{ width: 50, height: 50 }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'category', headerName: 'Category', type: 'number', width: 90 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'oldPrice', headerName: 'Old Price', width: 100 },
    { field: 'color', headerName: 'Color', width: 100 },
    { field: 'rating', headerName: 'Rating', width: 80 },
    { field: 'salesCount', headerName: 'Sales Count', width: 80 },
    { field: 'itemsInStock', headerName: 'In Stock', width: 100 },
  ];

  React.useEffect(() => {
    if (!userInfo?.isAdmin) {
      router.push('/');
    }
    const fetchHandler = async () => {
      try {
        dispatch(fetchRequest());
        const { data } = await axios.get<{}, AppResponse<ProductSchema>>(
          '/api/admin/products',
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
            Deleting product.
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            This may take some time.
          </Typography>
          <CircularProgress />
        </Box>
      </Modal>
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
            <NextLink href="/admin/product/create" passHref>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#40BFFF' }}
                component="a"
                startIcon={<Add />}
              >
                Add product
              </Button>
            </NextLink>
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
                pageSize={50}
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
