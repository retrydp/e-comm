import React from 'react';import { useAppSelector, useAppDispatch } from '../../../store';
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
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { AdminSidebar } from '../../../components';
import axios from 'axios';
import {
  ProductRequest,
  AppResponse,
  ProductSchema,
} from '../../../utils/types';
import {
  uploadRequest,
  uploadSuccess,
  uploadError,
  addError,
  addRequest,
  addSuccess,
} from '../../../store/adminProduct';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import useFormSettings from '../../../utils/hooks/useFormSettings';

interface EditProductProps {
  slug: string;
}

const EditProduct: React.FC<EditProductProps> = ({ slug }) => {
  const [categoryValue, setCategoryValue] = React.useState<string>('bags');
  const [brandValue, setBrandValue] = React.useState<string>('nike');
  const [preview, setPreview] = React.useState<string>();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    authStore: { userInfo },
    adminProduct: { loading, loadingAdd, errorText },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const { product } = useFormSettings();
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

  /**
   * @description This function is used to send the request to the server with the data from the forms.
   */
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
  }: Record<string, any>) => {
    try {
      dispatch(addRequest());
      const { data } = await axios.patch<
        ProductRequest,
        AppResponse<ProductSchema>
      >(
        `/api/admin/product/${slug}`,
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
      enqueueSnackbar(`Product ${data.payload.name} updated successfully`, {
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

  /**
   * @description This function is used to upload the image to the server.
   */
  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      enqueueSnackbar('Can not get file.', { variant: 'error' });
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch(uploadRequest());
      const { data } = await axios.post<FormData, AppResponse<string>>(
        '/api/admin/upload',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo?.token}`,
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

  /**
   * @description Handler for the select type element, to set the value of the select type and renew the state.
   */
  const selectHandleChange = (
    event: SelectChangeEvent<string>,
    name: string
  ) => {
    selectTypeItems[name].stateSetter(event.target.value);
    setValue(name, event.target.value);
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(uploadRequest());
        const { data } = await axios.get<null, AppResponse<ProductSchema>>(
          `/api/admin/product/${slug}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        dispatch(uploadSuccess());
        const formTitles = product.map(({ name }) => name);
        formTitles.forEach((title) => {
          setValue(title, data.payload[title]);
        });
        setPreview(data.payload.images[0]);
      } catch (error: any) {
        dispatch(uploadError(error.toString()));
      }
    };
    fetchProducts();
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
            <Typography sx={{ fontSize: '20px' }}>Edit Product</Typography>
          </Box>
          {loadingAdd || loading ? (
            <CircularProgress />
          ) : errorText ? (
            <Typography sx={{ color: 'red' }}>{errorText}</Typography>
          ) : (
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={{ width: '100%' }}
            >
              <List>
                {product.map(
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
                        priority={true}
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
                    Update product
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

export default EditProduct;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;
  return { props: { slug } };
};
