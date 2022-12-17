import React from 'react';
import { CssBaseline, Grid } from '@mui/material';
import { AdminSidebar } from '../../components';
import useAccessProvider from 'utils/hooks/useAccessProvider';

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
