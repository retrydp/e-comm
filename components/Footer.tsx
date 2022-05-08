import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from '../utils/styles';

const Footer: React.FC = (): JSX.Element => {
  return (
    <Box sx={styles.footer}>
      <Typography>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
        reiciendis quo dolore a? Corrupti, ratione alias nam deleniti veritatis,
        deserunt in dolor numquam ab, quas quaerat magni iure cupiditate vel?
        Debitis consequatur quas magni fugit repellat consectetur repudiandae
        eum veniam ullam quos, quasi et neque? In officiis neque aut accusamus
        enim nobis expedita temporibus pariatur ducimus quod. Commodi, cum iste?
        Quibusdam impedit qui voluptatem in culpa suscipit quis nostrum dolorem
        delectus?
      </Typography>
    </Box>
  );
};

export default Footer;
