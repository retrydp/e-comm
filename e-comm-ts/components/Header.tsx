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
} from '@mui/icons-material';

import React from 'react';
import classes from '../utils/classes';

const Header: React.FC = (): JSX.Element => {
  const [language, setLanguage] = React.useState<string>('EN');
  const [currency, setCurrency] = React.useState<string>('USD');

  const sm = useMediaQuery('(min-width:600px)');

  const handleLanguageChange = (event: SelectChangeEvent) =>
    setLanguage(event.target.value as string);

  const handleCurrencyChange = (event: SelectChangeEvent) =>
    setCurrency(event.target.value as string);

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={classes.grow}></Box>
        <Box sx={classes.userActions}>
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
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
