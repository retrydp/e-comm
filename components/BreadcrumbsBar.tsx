import { Breadcrumbs, Button, Typography } from '@mui/material';
import React from 'react';
import { withRouter, NextRouter } from 'next/router';
import NextLink from 'next/link';
import { Home } from '@mui/icons-material';

interface WithRouterProps {
  router: NextRouter;
}

const BreadcrumbsBar: React.FC<WithRouterProps> = ({ router }) => {
  const { slug, category } = router.query;

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
        <Typography
          sx={{ ml: 2, fontSize: '0.875rem', textTransform: 'capitalize' }}
        >
          {slug ? slug : router.pathname.split('/').pop()}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default withRouter(BreadcrumbsBar);
