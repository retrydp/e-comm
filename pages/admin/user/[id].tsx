import React from 'react';
import dynamic from 'next/dynamic';
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
import { Controller, FieldValues, useForm } from 'react-hook-form';
const AdminSidebar = dynamic(() => import('../../../components/AdminSidebar'));
import axios from 'axios';
import { AppResponse, UserSchema } from '../../../utils/types';
import { GetServerSideProps } from 'next';
import {
  useFetchHandler,
  useFormSettings,
  useInform,
  useAccessProvider,
} from '../../../utils/hooks';
import apiRoutes from '../../../constants/apiRoutes';
import notificationMessages from '../../../constants/notificationMessages';
import { isAxiosError } from '../../../utils/errorHandler';
import styles from '../../../utils/styles';

interface EditUserProps {
  id: string;
}

const EditUser: React.FC<EditUserProps> = ({ id }) => {
  const { snackbarSuccess, snackbarError } = useInform();
  const { onNotAdmin } = useAccessProvider();
  const [isAdminValue, setIsAdminValue] = React.useState<boolean>(false);
  const { isLoading, fetchError, setIsLoading, setFetchError } =
    useFetchHandler();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useFormSettings();

  /**
   * @description This function is used to send the request to the server with the data from the forms.
   */
  const submitHandler = async ({ name, email, isAdmin }: FieldValues) => {
    try {
      setIsLoading(true);
      await axios.patch<UserSchema, AppResponse<UserSchema>>(
        `${apiRoutes.ADMIN_USER}${id}`,
        {
          name,
          email,
          isAdmin,
        }
      );
      snackbarSuccess(notificationMessages.USER_UPDATE_SUCCESS);
      setIsLoading(false);
      setFetchError('');
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

  /**
   * @description Handler for the select type element, to set the value of the select type and renew the state.
   */
  const selectHandleChange = (event: SelectChangeEvent<boolean>) => {
    setIsAdminValue(event.target.value === 'true');
    setValue('isAdmin', event.target.value === 'true');
  };

  React.useEffect(() => {
    onNotAdmin();
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<'', AppResponse<UserSchema>>(
          `${apiRoutes.ADMIN_USER}${id}`
        );
        const formTitles = user.map(({ name }) => name);
        formTitles.forEach((title) => {
          setValue(title, data.payload[title]);
        });
        setIsLoading(false);
        setFetchError('');
        setIsAdminValue(data.payload.isAdmin);
      } catch (error: unknown) {
        setIsLoading(false);
        if (isAxiosError<{ message: string }>(error)) {
          const errorText = error.response?.data.message;
          setFetchError(errorText);
        } else {
          setFetchError(`Unexpected error`);
        }
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <AdminSidebar activeTab="users" />
        <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
          <Box sx={styles.userSidebar}>
            <Typography sx={styles.fz20}>Edit User</Typography>
          </Box>
          {isLoading ? (
            <CircularProgress />
          ) : fetchError ? (
            <Typography sx={styles.colorRed}>{fetchError}</Typography>
          ) : (
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={styles.fullWidth}
            >
              <List>
                {user.map(
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
                                value={isAdminValue}
                                label={name}
                                onChange={(event) => selectHandleChange(event)}
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
                  <Button variant="contained" type="submit" sx={styles.blueBg}>
                    Update user
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

export default EditUser;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  );
  
  const id = params?.id;

  return { props: { id } };
};
