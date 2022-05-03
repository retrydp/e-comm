import React from 'react';
import { useAppSelector } from '../../store';
import { useRouter } from 'next/router';
import { CssBaseline, Grid } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);

  React.useEffect(() => {
    if (!userInfo?.isAdmin) {
      router.push('/');
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
