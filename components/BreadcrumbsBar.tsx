import { Breadcrumbs, Button, Typography } from '@mui/material';import React from 'react';
import { withRouter, NextRouter } from 'next/router';
import NextLink from 'next/link';
import { Home } from '@mui/icons-material';
import { useAppSelector } from '../store';
interface WithRouterProps {
  router: NextRouter;
}

const BreadcrumbsBar: React.FC<WithRouterProps> = ({ router }) => {
  const { category } = router.query;
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
        <NextLink href={`/loading?category=${category}`} passHref>
          <Button color="primary" sx={{ p: 1, textTransform: 'capitalize' }}>
            {category}
          </Button>
        </NextLink>
      )}
      {router.pathname === '/loading' || (
        <Typography sx={{ ml: 2, fontSize: '0.875rem' }}>
          {currentProduct ? currentProduct : 'Product not available'}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default withRouter(BreadcrumbsBar);
