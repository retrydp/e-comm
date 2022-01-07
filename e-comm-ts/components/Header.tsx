import { Button, Toolbar, Typography, Box, Tooltip } from '@mui/material';
import {
  ShoppingCartOutlined,
  PermIdentityOutlined,
  Search,
  Menu,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import classes from '../utils/classes';
import NextLink from 'next/link';

const Header: React.FC = () => {
  const sm = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tooltip title="Menu" arrow>
          <NextLink href="/" passHref>
            <Button component="a" sx={classes.navLink} aria-label="Menu">
              <Menu />
            </Button>
          </NextLink>
        </Tooltip>
        <Box sx={classes.grow}></Box>
        <Box sx={classes.userActions}>
          <Tooltip title="Search" arrow>
            <NextLink href="/" passHref>
              <Button component="a" sx={classes.navLink} aria-label="Search">
                <Search />
              </Button>
            </NextLink>
          </Tooltip>
          <Tooltip title="Cart" arrow>
            <NextLink href="/" passHref>
              <Button component="a" sx={classes.navLink} aria-label="User Cart">
                <ShoppingCartOutlined />
              </Button>
            </NextLink>
          </Tooltip>
          {sm && (
            <Tooltip title="Total price" arrow>
              <Typography sx={classes.navPrice}>{`$${'0.00'}`}</Typography>
            </Tooltip>
          )}
          <Tooltip title="Profile" arrow>
            <NextLink href="/" passHref>
              <Button
                component="a"
                sx={classes.navLink}
                aria-label="User Profile"
              >
                <PermIdentityOutlined />
              </Button>
            </NextLink>
          </Tooltip>
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
