import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
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
import {
  useFormSettings,
  useInform,
  useAccessProvider,
} from '../../../utils/hooks';
import apiRoutes from '../../../constants/apiRoutes';
import notificationMessages from '../../../constants/notificationMessages';
import { isAxiosError } from '../../../utils/errorHandler';
import styles from '../../../utils/styles';

interface EditProductProps {
  slug: string;
}

const EditProduct: React.FC<EditProductProps> = ({ slug }) => {
  const { snackbarSuccess, snackbarError } = useInform();
  const { onNotAdmin } = useAccessProvider();
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
        }
      );
      snackbarSuccess(notificationMessages.PRODUCT_UPDATED);
      dispatch(adminProductAddSuccess());
    } catch (error: unknown) {
      if (isAxiosError<{ message: string }>(error)) {
        const errorText = error?.response?.data?.message;
        snackbarError(errorText);
        dispatch(adminProductAddError(errorText));
      } else {
        snackbarError(`Unexpected error`);
        dispatch(adminProductAddError(`Unexpected error`));
      }
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
        bodyFormData
      );
      dispatch(adminProductUploadSuccess());
      setValue('images', data.payload);
      setPreview(data.payload);
      snackbarSuccess(notificationMessages.UPLOAD_SUCCESS);
    } catch (error: unknown) {
      setPreview('');
      setValue('images', '');
      if (isAxiosError<{ message: string }>(error)) {
        const errorText = error.response?.data.message;
        dispatch(adminProductUploadError(errorText));
        snackbarError(errorText);
      } else {
        dispatch(adminProductUploadError(`Unexpected error`));
        snackbarError(`Unexpected error`);
      }
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
          `${apiRoutes.ADMIN_PRODUCT}${slug}`
        );
        dispatch(adminProductUploadSuccess());
        const formTitles = product.map(({ name }) => name);
        formTitles.forEach((title) => {
          setValue(title, data.payload[title]);
        });
        setPreview(data.payload.images[0]);
      } catch (error: unknown) {
        if (isAxiosError<{ message: string }>(error))
          dispatch(adminProductUploadError(error.response?.data.message));
        else {
          dispatch(adminProductUploadError(`Unexpected error`));
        }
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
          <Box sx={styles.userSidebar}>
            <Typography sx={styles.fz20}>Edit Product</Typography>
          </Box>
          {adminProductLoadingAdd || adminProductLoading ? (
            <CircularProgress />
          ) : adminProductErrorText ? (
            <Typography sx={styles.colorRed}>
              {adminProductErrorText}
            </Typography>
          ) : (
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={styles.fullWidth}
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
                                <Typography sx={styles.capitalize}>
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
                                    <Typography sx={styles.capitalize}>
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
                    sx={styles.blueBg}
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
                  <ListItem sx={styles.preview}>
                    <Typography>Preview:</Typography>
                    <Box sx={styles.previewImage}>
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
                  <Button variant="contained" type="submit" sx={styles.blueBg}>
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
