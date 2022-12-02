import React from 'react';
import Cookies from 'js-cookie';
import { AppResponse, UserSchema } from '../utils/types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
  InputAdornment,
} from '@mui/material';
import { MailOutline, PasswordOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useSharedContext } from '../context/SharedContext';
import Head from 'next/head';
import styles from '../utils/styles';
import { useAppDispatch } from '../store';
import { userLogin } from '../store/authStore';
import useFormSettings from '../utils/hooks/useFormSettings';
import apiRoutes from '../constants/apiRoutes';

const Login: React.FC = () => {
  const { snackbarError } = useSharedContext();
  const router = useRouter();
  const { redirect } = router.query;

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const icons = {
    mail: MailOutline,
    password: PasswordOutlined,
  };
  const { login } = useFormSettings();

  /**
   * @description This function is used to send the request to the server with the data from the forms.
   */
  const submitHandler = async ({ email, password }: Record<string, string>) => {
    try {
      const { data } = await axios.post<
        Record<'email' | 'password', string>,
        AppResponse<UserSchema>
      >(apiRoutes.USERS_LOGIN, {
        email,
        password,
      });
      dispatch(userLogin(data.payload));
      Cookies.set('userInfo', JSON.stringify(data.payload));
      router.push((redirect as string) || '/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseError = error?.response?.data?.['message'];
        if (responseError) {
          snackbarError(responseError);
        }
      } else {
        throw new Error('Bcrypt error.');
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <CssBaseline />
      <Container maxWidth="sm" sx={styles.regContainer}>
        <Box sx={{ mt: '60px' }}>
          <Image
            src="https://res.cloudinary.com/retrydp/image/upload/v1651478617/xmqphhxdjbtivv8o3lrm.svg"
            width="72"
            height="72"
            alt="E-comm logo"
          />
        </Box>
        <Typography variant="h2" sx={styles.regHeader}>
          Welcome to E-Comm
        </Typography>
        <Typography sx={styles.regText}>Sign in to continue</Typography>
        <form onSubmit={handleSubmit(submitHandler)} style={{ width: '100%' }}>
          <List>
            {login.map(({ name, label, icon, rules, helperText }) => {
              const Icon = icons[icon];

              return (
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
                          type: name === 'confirmPassword' ? 'password' : name,
                        }}
                        error={Boolean(errors[name])}
                        helperText={helperText}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon />
                            </InputAdornment>
                          ),
                        }}
                        {...field}
                      ></TextField>
                    )}
                  />
                </ListItem>
              );
            })}
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ backgroundColor: '#40BFFF' }}
              >
                login
              </Button>
            </ListItem>
            <ListItem>
              Don&apos;t have an account? &nbsp;
              <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                <Link>Sign Up</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Container>
    </>
  );
};

export default Login;
