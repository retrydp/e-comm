import React from 'react';
import { Inputs } from './register';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import logo from '../public/assets/img/logo.svg';
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
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import styles from '../utils/styles';

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const inputs: Inputs[] = [
    {
      name: 'email',
      label: 'E-mail',
      icon: <MailOutline />,
      rules: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      },
      helperText: errors.email
        ? errors.email.type === 'pattern'
          ? 'Email is not valid'
          : 'Email is required'
        : '',
    },
    {
      name: 'password',
      label: 'Password',
      icon: <PasswordOutlined />,
      rules: {
        required: true,
        minLength: 6,
      },
      helperText: errors.password
        ? errors.password.type === 'minLength'
          ? 'Password is too short'
          : 'Password is required'
        : '',
    },
  ];
  const submitHandler = async ({ email, password }: { [key: string]: any }) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      console.log(data);
      // dispatch({ type: 'USER_LOGIN', payload: data });
      // Cookies.set('userInfo', JSON.stringify(data));
      // router.push(redirect || '/');
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
        <title>Login</title>
      </Head>
      <CssBaseline />
      <Container maxWidth="sm" sx={styles.regContainer}>
        <Box sx={{ mt: '60px' }}>
          <Image src={logo.src} width="72" height="72" alt="E-comm logo" />
        </Box>
        <Typography variant="h2" sx={styles.regHeader}>
          Login to E-Comm
        </Typography>
        <Typography sx={styles.regText}>
          Enter your e-mail and password.
        </Typography>
        <form onSubmit={handleSubmit(submitHandler)} style={{ width: '100%' }}>
          <List>
            {inputs.map(({ name, label, icon, rules, helperText }) => (
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
                            {icon}
                          </InputAdornment>
                        ),
                      }}
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
                fullWidth
                sx={{ backgroundColor: '#40BFFF' }}
              >
                login
              </Button>
            </ListItem>
            <ListItem>
              Don't have an account? &nbsp;
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
