import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  SelectChangeEvent,
  Link,
  Box,
  Tooltip,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  ShoppingCartOutlined,
  PermIdentityOutlined,
  Search,
  Menu,
} from '@mui/icons-material';

import React from 'react';
import classes from '../utils/classes';

const Header: React.FC = () => {
  const sm = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tooltip title="Menu" arrow>
          <Button component="a" href="/" sx={classes.navLink} aria-label="Menu">
            <Menu />
          </Button>
        </Tooltip>
        <Box sx={classes.grow}></Box>
        <Box sx={classes.userActions}>
          <Tooltip title="Search" arrow>
            <Button
              component="a"
              href="/"
              sx={classes.navLink}
              aria-label="Search"
            >
              <Search />
            </Button>
          </Tooltip>
          <Tooltip title="Cart" arrow>
            <Button
              component="a"
              href="/"
              sx={classes.navLink}
              aria-label="User Cart"
            >
              <ShoppingCartOutlined />
            </Button>
          </Tooltip>
          {sm && (
            <Tooltip title="Total price" arrow>
              <Typography sx={classes.navPrice}>{`$${'0.00'}`}</Typography>
            </Tooltip>
          )}

          <Tooltip title="Profile" arrow>
            <Button
              component="a"
              href="/"
              sx={classes.navLink}
              aria-label="User Profile"
            >
              <PermIdentityOutlined />
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
