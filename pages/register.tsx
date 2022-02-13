import React from 'react';
import Head from 'next/head';
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
  SvgIconComponent,
  MailOutline,
  PasswordOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import logo from '../public/assets/img/logo.svg';
import styles from '../utils/styles';
import { Controller, useForm, ValidationRule } from 'react-hook-form';
import axios from 'axios';

interface Inputs {
  name: string;
  icon: React.ReactNode;
  label: string;
  rules: {
    required?: ValidationRule<boolean>;
    pattern?: ValidationRule<RegExp>;
    minLength?: ValidationRule<number>;
  };
  helperText: React.ReactNode;
}

const Register = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const inputs: Inputs[] = [
    {
      name: 'login',
      label: 'Login',
      icon: <PersonOutline />,
      rules: {
        required: true,
        minLength: 2,
      },
      helperText: errors.login
        ? errors.login.type === 'minLength'
          ? 'Login is to short'
          : 'Login is required'
        : '',
    },
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
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      icon: <PasswordOutlined />,
      rules: {
        required: true,
        minLength: 6,
      },
      helperText: errors.confirmPassword
        ? errors.confirmPassword.type === 'minLength'
          ? 'Confirm Password is too short'
          : 'Password is required'
        : '',
    },
  ];

  const submitHandler = async ({
    email,
    password,
    name,
    confirmPassword,
  }: {
    [key: string]: string;
  }) => {
    if (password !== confirmPassword) {
      console.log('Passwords don`t match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      // dispatch({ type: 'USER_LOGIN', payload: data });
      // Cookies.set('userInfo', JSON.stringify(data));
      // router.push(redirect || '/');
    } catch (error) {
      //enqueueSnackbar(getError(error), { variant: 'error' });
      console.log(error);
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
        <Typography sx={styles.regText}>Create an new account</Typography>
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