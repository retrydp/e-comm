import React from 'react';import { CssBaseline, Grid } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import { useSharedContext } from '../../context/SharedContext';

const AdminDashboard: React.FC = () => {
  const { onNotAdmin } = useSharedContext();

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
