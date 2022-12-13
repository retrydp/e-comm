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
  MailOutline,
  PasswordOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import styles from '../utils/styles';
import { Controller, useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { useSharedContext } from '../context/SharedContext';
import { AppResponse, UserSchema } from '../utils/types';
import useFormSettings from '../utils/hooks/useFormSettings';
import apiRoutes from '../constants/apiRoutes';
import { signIn } from 'next-auth/react';

const Register: React.FC = () => {
  const { snackbarError } = useSharedContext();
  const router = useRouter();
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
  const { register } = useFormSettings();

  /**
   * @description This function is used to send the request to the server with the data from the forms.
   */
  const submitHandler = async ({
    email,
    password,
    name,
    confirmPassword,
  }: FieldValues) => {
    if (password !== confirmPassword) {
      snackbarError('Passwords don`t match');

      return;
    }
    try {
      const { data } = await axios.post<
        { name: string; email: string; password: string },
        AppResponse<UserSchema>
      >(apiRoutes.USER_REGISTER, {
        name,
        email,
        password,
      });
      if (data.success) {
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          snackbarError(res.error);
        } else {
          router.push((redirect as string) || '/');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseError = error?.response?.data?.['message'];
        if (responseError) {
          snackbarError(responseError);
        }
      } else {
        throw new Error(`Unexpected error`);
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
          <Image
            src="https://res.cloudinary.com/retrydp/image/upload/v1651478617/xmqphhxdjbtivv8o3lrm.svg"
            width="72"
            height="72"
            alt="E-comm logo"
          />
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
