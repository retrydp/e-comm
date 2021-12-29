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
        <Grid container spacing={1}>
          <Grid item>
            <FormControl fullWidth sx={classes.navSelect}>
              <InputLabel id="language-changer">Language</InputLabel>
              <Select
                labelId="language-changer-label"
                id="language-changer"
                value={language}
                label="Language"
                onChange={handleLanguageChange}
              >
                <MenuItem value="EN">EN</MenuItem>
                <MenuItem value="UA">UA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth sx={classes.navSelect}>
              <InputLabel id="currency-changer">Currency</InputLabel>
              <Select
                labelId="currency-changer-label"
                id="currency-changer"
                value={currency}
                label="Currency"
                onChange={handleCurrencyChange}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="GRN">GRN</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={classes.grow}></Box>
        <Box sx={classes.userActions}>
          <Button component="div" sx={classes.navLink}>
            <PermIdentityOutlined />
          </Button>

          <Button component="a" href="/" sx={classes.navLink}>
            <ShoppingCartOutlined />
          </Button>
          {sm && <Typography sx={classes.navPrice}>{`$${'0.00'}`}</Typography>}

          <Button component="a" href="/" sx={classes.navLink}>
            <Search />
          </Button>
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
