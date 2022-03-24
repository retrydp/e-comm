import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
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
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import styles from '../../../utils/styles';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { AdminSidebar } from '../../../components';
import axios, { AxiosResponse } from 'axios';
import { Inputs, ProductRequest, ProductResponse } from '../../../utils/types';
import {
  uploadRequest,
  uploadSuccess,
  uploadError,
  addError,
  addRequest,
  addSuccess,
} from '../../../store/adminProduct';
import Image from 'next/image';

interface ProductForm extends Omit<Inputs, 'icon'> {
  inputType: string;
  selectTypeContent?: string[];
}

interface Response extends AxiosResponse<{ payload: string }> {}

const CreateProduct: React.FC = () => {
  const [categoryValue, setCategoryValue] = React.useState<string>('bags');
  const [brandValue, setBrandValue] = React.useState<string>('nike');
  const [preview, setPreview] = React.useState<string>();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { redirect } = router.query;
  const {
    authStore: { userInfo },
    adminProduct: { loading, loadingAdd },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    setValue,
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
      selectTypeContent: ['sneakers', 'belts', 'bags'],
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
      selectTypeContent: ['nike', 'adidas', 'airmax'],
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
        minLength: 1,
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
        minLength: 1,
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
      name: 'itemsInStock',
      label: 'Items In Stock',
      rules: {
        required: true,
        minLength: 1,
      },
      inputType: 'number',
      helperText: errors.itemsInStock
        ? errors.itemsInStock.type === 'minLength'
          ? 'Items In Stock is to short'
          : 'Items In Stock is required'
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
  ];

  const selectTypeItems = {
    category: {
      value: categoryValue,
      stateSetter: setCategoryValue,
    },
    brand: {
      value: brandValue,
      stateSetter: setBrandValue,
    },
  };

  const submitHandler = async ({
    name,
    description,
    category,
    brand,
    price,
    oldPrice,
    color,
    itemsInStock,
    images,
  }: {
    [key: string]: any;
  }) => {
    try {
      dispatch(addRequest());
      const { data } = await axios.put<ProductRequest, ProductResponse>(
        '/api/admin/product/add',
        {
          name,
          description,
          category,
          brand,
          price,
          oldPrice,
          color,
          itemsInStock,
          images,
        },
        {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        }
      );
      enqueueSnackbar(`Product ${data.payload.name} uploaded successfully`, {
        variant: 'success',
      });
      dispatch(addSuccess());
      //   router.push((redirect as string) || '/');
    } catch (error: any) {
      const errorText = error.response.data.message || error.toString();
      dispatch(addError(error.toString()));
      enqueueSnackbar(errorText, { variant: 'error' });
    }
  };

  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) {
      enqueueSnackbar('Can not get file.', { variant: 'error' });
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch(uploadRequest());
      const { data } = await axios.post<FormData, Response>(
        '/api/admin/upload',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch(uploadSuccess());
      setValue('images', data.payload);
      setPreview(data.payload);
      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    } catch (error: any) {
      const errorText = error.response.data.message || error.toString();
      dispatch(uploadError(error.toString()));
      setPreview('');
      setValue('images', '');
      enqueueSnackbar(errorText, { variant: 'error' });
    }
  };

  const selectHandleChange = (
    event: SelectChangeEvent<string>,
    name: string
  ) => {
    selectTypeItems[name].stateSetter(event.target.value);
    setValue(name, event.target.value);
  };

  React.useEffect(() => {
    setValue('category', categoryValue);
    setValue('brand', brandValue);
    if (!userInfo?.isAdmin) router.push('/');
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
            <Typography sx={{ fontSize: '20px' }}>Add Product</Typography>
          </Box>
          {loadingAdd ? (
            <CircularProgress />
          ) : (
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={{ width: '100%' }}
            >
              <List>
                {inputs.map(
                  ({
                    name,
                    label,
                    rules,
                    helperText,
                    inputType,
                    selectTypeContent,
                  }) => (
                    <ListItem key={name}>
                      <Controller
                        name={name}
                        control={control}
                        defaultValue=""
                        rules={rules}
                        render={({ field }) =>
                          selectTypeContent ? (
                            <FormControl fullWidth>
                              <InputLabel id={`${name}-select-label`}>
                                <Typography
                                  sx={{ textTransform: 'capitalize' }}
                                >
                                  {name}
                                </Typography>
                              </InputLabel>
                              <Select
                                labelId={`${name}-select-label`}
                                id={`${name}-select`}
                                value={selectTypeItems[name].value}
                                label={name}
                                onChange={(event) =>
                                  selectHandleChange(event, name)
                                }
                              >
                                {selectTypeContent.map((item) => (
                                  <MenuItem value={item} key={item}>
                                    <Typography
                                      sx={{ textTransform: 'capitalize' }}
                                    >
                                      {item}
                                    </Typography>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id={name}
                              label={label}
                              inputProps={{
                                type:
                                  inputType === 'textarea' ? 'text' : inputType,
                              }}
                              multiline={inputType === 'textarea'}
                              rows={inputType === 'textarea' ? 4 : 1}
                              error={Boolean(errors[name])}
                              helperText={helperText}
                              {...field}
                            ></TextField>
                          )
                        }
                      />
                    </ListItem>
                  )
                )}
                <ListItem>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: '#40BFFF' }}
                  >
                    Upload Image
                    <input
                      type="file"
                      onChange={uploadHandler}
                      hidden
                      accept="image/*"
                    />
                  </Button>
                  {loading && <CircularProgress />}
                </ListItem>
                {preview && (
                  <ListItem
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '5px',
                    }}
                  >
                    <Typography>Preview:</Typography>
                    <Box sx={{ width: '100%', maxWidth: '500px' }}>
                      {/* TODO  this in other cases */}
                      <Image
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        src={preview}
                      ></Image>
                    </Box>
                  </ListItem>
                )}
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
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CreateProduct;
