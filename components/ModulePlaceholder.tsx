import { Grid } from '@mui/material';
import React from 'react';
import CustomSkeleton from '../utils/customMuiComponents/CustomSkeleton';

interface ModulePlaceholderProps {
  displayCount: number;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  displayCount,
}) => {
  return (
    <Grid container spacing={3} sx={{ padding: '15px 0' }}>
      {Array.from({ length: displayCount }).map((_, idx) => (
        <Grid item lg={4} md={4} sm={4} xs={12} key={idx}>
          <CustomSkeleton variant="rectangular" height={450} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ModulePlaceholder;
