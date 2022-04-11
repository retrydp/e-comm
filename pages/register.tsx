import React from 'react';import Head from 'next/head';
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
import {
  PersonOutline,
  MailOutline,
  PasswordOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import logo from '../public/assets/img/logo.svg';
import styles from '../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { AppResponse, UserSchema } from '../utils/types';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../store';
import { userLogin } from '../store/authStore';
import formSettings from '../utils/formSettings';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { redirect } = router.query;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const icons = {
    person: PersonOutline,
    mail: MailOutline,
    password: PasswordOutlined,
  };
  const { register } = formSettings(errors);

  /**
   * @description This function is used to send the request to the server with the data from the forms.
   */
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
      const { data } = await axios.post<
        { name: string; email: string; password: string },
        AppResponse<UserSchema>
      >('/api/users/register', {
        name,
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
      <Head>
        <title>Registration</title>
      </Head>
      <CssBaseline />
      <Container maxWidth="sm" sx={styles.regContainer}>
        <Box sx={{ mt: '60px' }}>
          <Image src={logo.src} width="72" height="72" alt="E-comm logo" />
        </Box>
        <Typography variant="h2" sx={styles.regHeader}>
          Let’s Get Started
        </Typography>
        <Typography sx={styles.regText}>Create a new account</Typography>
        <form onSubmit={handleSubmit(submitHandler)} style={{ width: '100%' }}>
          <List>
            {register.map(({ name, label, icon, rules, helperText }) => {
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
                Register
              </Button>
            </ListItem>
            <ListItem>
              Already have an account?&nbsp;
              <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                <Link>Login</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Container>
    </>
  );
};

export default Register;
