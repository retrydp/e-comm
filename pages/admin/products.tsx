import React from 'react';
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
import apiRoutes from '../../constants/apiRoutes';
import notificationMessages from '../../constants/notificationMessages';
import { isAxiosError } from '../../utils/errorHandler';
import {
  useAccessProvider,
  useInform,
  useFetchHandler,
} from '../../utils/hooks';

const AdminProducts: React.FC = () => {
  const { snackbarSuccess, snackbarError } = useInform();
  const { onNotAdmin } = useAccessProvider();
  const {
    fetchData,
    fetchError,
    isLoading,
    setFetchData,
    setFetchError,
    setIsLoading,
  } = useFetchHandler<ProductSchema[]>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  /**
   * @description Function to delete a product from the database.
   * @param {string} productSlug value of the product.
   */
  const handleDeleteProduct = async (productSlug: string) => {
    if (confirm(`Do you want to delete ${productSlug}`)) {
      setIsLoading(true);
      setModalOpen(true);
      try {
        await axios.delete<string, AppResponse<ProductSchema[]>>(
          apiRoutes.ADMIN_PRODUCTS,
          {
            data: productSlug,
          }
        );
        setIsLoading(false);
        setFetchData((prev) => prev.filter(({ slug }) => slug !== productSlug));
        setFetchError('');
        setModalOpen(false);
        snackbarSuccess(notificationMessages.PRODUCT_DELETED);
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
          sx={styles.avatar}
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
        setIsLoading(true);
        const { data } = await axios.get<null, AppResponse<ProductSchema[]>>(
          apiRoutes.ADMIN_PRODUCTS
        );
        setFetchData(data.payload);
        setIsLoading(false);
      } catch (error: unknown) {
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
          <Typography id="modal-description" sx={styles.mt2}>
            This may take some time.
          </Typography>
          <CircularProgress />
        </Box>
      </Modal>
      <Grid container spacing={2}>
        <AdminSidebar activeTab="products" />
        <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
          <Box sx={styles.adminSidebarWrapper}>
            <Typography sx={styles.fz20}>Products</Typography>
            <NextLink href="/admin/product/create" passHref>
              <Button
                variant="contained"
                sx={styles.blueBg}
                component="a"
                startIcon={<Add />}
              >
                Add product
              </Button>
            </NextLink>
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
