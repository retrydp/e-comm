import React from 'react';import { useRouter } from 'next/router';
import { CssBaseline, Grid } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import { useSharedContext } from '../../context/SharedContext';

const AdminDashboard: React.FC = () => {
  const { userInfo, onNotAdmin } = useSharedContext();
  const router = useRouter();

  React.useEffect(() => {
    onNotAdmin();
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
