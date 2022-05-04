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
import { useSharedContext } from '../../../context/SharedContext';
import { Controller, useForm } from 'react-hook-form';
import { AdminSidebar } from '../../../components';
import axios from 'axios';
import { AppResponse, UserSchema } from '../../../utils/types';
import {
  adminUserEditRequest,
  adminUserEditSuccess,
  adminUserEditError,
} from '../../../store/adminUser';
import { GetServerSideProps } from 'next';
import useFormSettings from '../../../utils/hooks/useFormSettings';

interface EditUserProps {
  id: string;
}

const EditUser: React.FC<EditUserProps> = ({ id }) => {
  const { snackbar, userInfo, onNotAdmin } = useSharedContext();
  const [isAdminValue, setIsAdminValue] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    adminUser: { adminUserLoading, adminUserErrorText },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
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
  const submitHandler = async ({
    name,
    email,
    isAdmin,
  }: Record<string, any>) => {
    try {
      dispatch(adminUserEditRequest());
      const { data } = await axios.patch<UserSchema, AppResponse<UserSchema>>(
        `/api/admin/user/${id}`,
        {
          name,
          email,
          isAdmin,
        },
        {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        }
      );
      snackbar(`User ${data.payload.name} updated successfully`, {
        variant: 'success',
      });
      dispatch(adminUserEditSuccess());
      //   router.push((redirect as string) || '/');
    } catch (error: any) {
      const errorText = error.response.data.message || error.toString();
      dispatch(adminUserEditError(error.toString()));
      snackbar(errorText, { variant: 'error' });
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
    const fetchUsers = async () => {
      try {
        dispatch(adminUserEditRequest());
        const { data } = await axios.get<'', AppResponse<UserSchema>>(
          `/api/admin/user/${id}`,
          {
            headers: {
              authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );

        dispatch(adminUserEditSuccess());
        const formTitles = user.map(({ name }) => name);
        formTitles.forEach((title) => {
          setValue(title, data.payload[title]);
        });
        setIsAdminValue(data.payload.isAdmin);
      } catch (error: any) {
        dispatch(adminUserEditError(error.toString()));
      }
    };
    fetchUsers();
    onNotAdmin();
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <AdminSidebar activeTab="users" />
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
            <Typography sx={{ fontSize: '20px' }}>Edit User</Typography>
          </Box>
          {adminUserLoading ? (
            <CircularProgress />
          ) : adminUserErrorText ? (
            <Typography sx={{ color: 'red' }}>{adminUserErrorText}</Typography>
          ) : (
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={{ width: '100%' }}
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
                                <Typography
                                  sx={{ textTransform: 'capitalize' }}
                                >
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
                    type="submit"
                    sx={{ backgroundColor: '#40BFFF' }}
                  >
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  return { props: { id } };
};
