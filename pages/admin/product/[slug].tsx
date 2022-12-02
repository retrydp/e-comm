import React from 'react';import { useAppSelector, useAppDispatch } from '../../../store';
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
import { useSharedContext } from '../../../context/SharedContext';
import { Controller, useForm, FieldValues } from 'react-hook-form';
import { AdminSidebar } from '../../../components';
import axios from 'axios';
import {
  ProductRequest,
  AppResponse,
  ProductSchema,
} from '../../../utils/types';
import {
  adminProductUploadRequest,
  adminProductUploadSuccess,
  adminProductUploadError,
  adminProductAddError,
  adminProductAddSuccess,
  adminProductAddRequest,
} from '../../../store/adminProduct';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import useFormSettings from '../../../utils/hooks/useFormSettings';
import apiRoutes from '../../../constants/apiRoutes';
import notificationMessages from '../../../constants/notificationMessages';

interface EditProductProps {
  slug: string;
}

const EditProduct: React.FC<EditProductProps> = ({ slug }) => {
  const {
    snackbarSuccess,
    snackbarError,
    onNotAdmin,
    authHeader,
    authHeaderForm,
  } = useSharedContext();
  const [categoryValue, setCategoryValue] = React.useState<string>('bags');
  const [brandValue, setBrandValue] = React.useState<string>('nike');
  const [preview, setPreview] = React.useState<string>();
  const {
    adminProduct: {
      adminProductLoading,
      adminProductLoadingAdd,
      adminProductErrorText,
    },
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
  }: FieldValues) => {
    try {
      dispatch(adminProductAddRequest());
      await axios.patch<ProductRequest, AppResponse<ProductSchema>>(
        `${apiRoutes.ADMIN_PRODUCT}${slug}`,
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
        authHeader
      );
      snackbarSuccess(notificationMessages.PRODUCT_UPDATED);
      dispatch(adminProductAddSuccess());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorText = error.response.data.message || error.toString();
      dispatch(adminProductAddError(error.toString()));
      snackbarError(errorText);
    }
  };

  /**
   * @description This function is used to upload the image to the server.
   */
  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      snackbarError(notificationMessages.UPLOAD_NO_FILE);
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch(adminProductUploadRequest());
      const { data } = await axios.post<FormData, AppResponse<string>>(
        apiRoutes.ADMIN_UPLOAD,
        bodyFormData,
        authHeaderForm
      );
      dispatch(adminProductUploadSuccess());
      setValue('images', data.payload);
      setPreview(data.payload);
      snackbarSuccess(notificationMessages.UPLOAD_SUCCESS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorText = error.response.data.message || error.toString();
      dispatch(adminProductUploadError(error.toString()));
      setPreview('');
      setValue('images', '');
      snackbarError(errorText);
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
    onNotAdmin();
    const fetchProducts = async () => {
      try {
        dispatch(adminProductUploadRequest());
        const { data } = await axios.get<null, AppResponse<ProductSchema>>(
          `${apiRoutes.ADMIN_PRODUCT}${slug}`,
          authHeaderForm
        );
        dispatch(adminProductUploadSuccess());
        const formTitles = product.map(({ name }) => name);
        formTitles.forEach((title) => {
          setValue(title, data.payload[title]);
        });
        setPreview(data.payload.images[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        dispatch(adminProductUploadError(error.toString()));
      }
    };
    fetchProducts();
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
          {adminProductLoadingAdd || adminProductLoading ? (
            <CircularProgress />
          ) : adminProductErrorText ? (
            <Typography sx={{ color: 'red' }}>
              {adminProductErrorText}
            </Typography>
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
                  {adminProductLoading && <CircularProgress />}
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
