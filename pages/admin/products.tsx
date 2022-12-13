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
import { useSharedContext } from '../../context/SharedContext';
import apiRoutes from '../../constants/apiRoutes';
import notificationMessages from '../../constants/notificationMessages';
import { isAxiosError } from 'utils/errorHandler';

const AdminProducts: React.FC = () => {
  const { snackbarSuccess, snackbarError, onNotAdmin } = useSharedContext();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const {
    adminPanelStore: { adminPanelData, adminPanelError, adminPanelLoading },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  /**
   * @description Function to delete a product from the database.
   * @param {string} productSlug value of the product.
   */
  const handleDeleteProduct = async (productSlug: string) => {
    if (confirm(`Do you want to delete ${productSlug}`)) {
      dispatch(adminPanelDeleteRequest());
      setModalOpen(true);
      try {
        await axios.delete<string, AppResponse<ProductSchema[]>>(
          apiRoutes.ADMIN_PRODUCTS,
          {
            data: productSlug,
          }
        );
        dispatch(
          adminPanelDeleteSuccess(
            (adminPanelData as ProductSchema[]).filter(
              ({ slug }) => slug !== productSlug
            )
          )
        );
        setModalOpen(false);
        snackbarSuccess(notificationMessages.PRODUCT_DELETED);
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
      ),
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
    onNotAdmin();
    const fetchHandler = async () => {
      try {
        dispatch(adminPanelFetchRequest());
        const { data } = await axios.get<null, AppResponse<ProductSchema>>(
          apiRoutes.ADMIN_PRODUCTS
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
            {adminPanelLoading ? (
              <CircularProgress />
            ) : adminPanelError ? (
              <Typography sx={{ color: 'red' }}>{adminPanelError}</Typography>
            ) : (
              <DataGrid
                getRowId={(row) => row._id}
                rows={adminPanelData}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[25]}
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
