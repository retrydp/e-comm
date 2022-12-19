import React from 'react';
import dynamic from 'next/dynamic';
import { CssBaseline, Grid } from '@mui/material';
const AdminSidebar = dynamic(() => import('../../components/AdminSidebar'));

import { useAccessProvider } from '../../utils/hooks';

const AdminDashboard: React.FC = () => {
  const { onNotAdmin } = useAccessProvider();

  React.useEffect(() => {
    onNotAdmin();
  }, []);

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
