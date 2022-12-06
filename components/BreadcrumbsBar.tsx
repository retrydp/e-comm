import { Breadcrumbs, Button, Typography } from '@mui/material';
import React from 'react';
import { withRouter, useRouter } from 'next/router';
import NextLink from 'next/link';
import { Home } from '@mui/icons-material';
import { useAppSelector } from '../store';

const BreadcrumbsBar: React.FC = () => {
  const router = useRouter();
  const { category, slug } = router.query;
  const {
    display: { currentProduct },
  } = useAppSelector((store) => store);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ p: '15px 0' }}>
      <NextLink href="/" passHref>
        <Button color="primary" sx={{ p: 1 }}>
          <Home fontSize="inherit" />
        </Button>
      </NextLink>
      {category && (
        // FIXME: incorrect display in contacts
        <NextLink href={`/loading?category=${category}`} passHref>
          <Button color="primary" sx={{ p: 1, textTransform: 'capitalize' }}>
            {category}
          </Button>
        </NextLink>
      )}
      {currentProduct && slug && (
        <Typography
          sx={{ ml: 2, fontSize: '0.875rem', textTransform: 'capitalize' }}
        >
          {currentProduct}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default withRouter(BreadcrumbsBar);
