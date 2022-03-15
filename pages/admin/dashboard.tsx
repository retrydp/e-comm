import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { useRouter } from 'next/router';
import { CssBaseline, Grid } from '@mui/material';
import styles from '../../utils/styles';

import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);

  React.useEffect(() => {
    if (!userInfo?.isAdmin) {
      router.push('/login');
    }
  });

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <AdminSidebar activeTab="dashboard" />
        <Grid item xl={9}>
          Dashboard will be here
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
