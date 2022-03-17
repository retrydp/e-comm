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
  List,
  ListItem,
  TextField,
} from '@mui/material';
import styles from '../../utils/styles';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';
import { Inputs } from '../../utils/types';

interface ProductForm extends Omit<Inputs, 'icon'> {
  inputType: string;
}

const CreateProduct: React.FC = () => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { redirect } = router.query;
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const inputs: ProductForm[] = [
    {
      name: 'name',
      label: 'Name',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.name
        ? errors.name.type === 'minLength'
          ? 'Name is to short'
          : 'Name is required'
        : '',
    },
    {
      name: 'description',
      label: 'Description',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'textarea',
      helperText: errors.description
        ? errors.description.type === 'minLength'
          ? 'Description is to short'
          : 'Description is required'
        : '',
    },
    {
      name: 'category',
      label: 'Category',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.category
        ? errors.category.type === 'minLength'
          ? 'Category is to short'
          : 'Category is required'
        : '',
    },
    {
      name: 'brand',
      label: 'Brand',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.brand
        ? errors.brand.type === 'minLength'
          ? 'Brand is to short'
          : 'Brand is required'
        : '',
    },
    {
      name: 'price',
      label: 'Price',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'number',
      helperText: errors.price
        ? errors.price.type === 'minLength'
          ? 'Price is to short'
          : 'Price is required'
        : '',
    },
    {
      name: 'oldPrice',
      label: 'Old Price',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'number',
      helperText: errors.oldPrice
        ? errors.oldPrice.type === 'minLength'
          ? 'OldPrice is to short'
          : 'OldPrice is required'
        : '',
    },
    {
      name: 'color',
      label: 'Color',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.color
        ? errors.color.type === 'minLength'
          ? 'Color is to short'
          : 'Color is required'
        : '',
    },
    {
      name: 'images',
      label: 'Images',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.images
        ? errors.images.type === 'minLength'
          ? 'Images is to short'
          : 'Images is required'
        : '',
    },
    {
      name: 'itemsInStock',
      label: 'Items In Stock',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.itemsInStock
        ? errors.itemsInStock.type === 'minLength'
          ? 'Items In Stock is to short'
          : 'Items In Stock is required'
        : '',
    },
  ];

  const submitHandler = async ({
    email,
    password,
    name,
    confirmPassword,
  }: {
    [key: string]: any;
  }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords don`t match', { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });

      //   router.push((redirect as string) || '/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseError = error?.response?.data?.['message'];
        if (responseError) {
          enqueueSnackbar(responseError, {
            variant: 'error',
          });
        }
      } else {
        throw new Error('Bcrypt error.');
      }
    }
  };

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
            <Typography sx={{ fontSize: '20px' }}>Add Product</Typography>
          </Box>
          <form
            onSubmit={handleSubmit(submitHandler)}
            style={{ width: '100%' }}
          >
            <List>
              {inputs.map(({ name, label, rules, helperText, inputType }) => (
                <ListItem key={name}>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue=""
                    rules={rules}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id={name}
                        label={label}
                        inputProps={{
                          type: inputType === 'textarea' ? 'text' : inputType,
                        }}
                        multiline
                        rows={inputType === 'textarea' ? 4 : 1}
                        error={Boolean(errors[name])}
                        helperText={helperText}
                        {...field}
                      ></TextField>
                    )}
                  />
                </ListItem>
              ))}
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: '#40BFFF' }}
                >
                  Add product
                </Button>
              </ListItem>
            </List>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateProduct;
