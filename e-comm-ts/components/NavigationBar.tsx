import {
  AppBar,
  Box,
  Grid,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import classes from '../utils/classes';
import useMediaQuery from '@mui/material/useMediaQuery';

type NavTitles = 'Home' | 'Bags' | 'Sneakers' | 'Belts' | 'Contacts';
type NavPaths = '/' | '/bags' | '/sneakers' | '/belts' | '/contacts';

interface NavItems {
  title: NavTitles;
  path: NavPaths;
}

interface NaviationBarProps {
  currentTab: NavTitles;
}

const NavigationBar: React.FC<NaviationBarProps> = ({ currentTab }) => {
  const menuItems: NavItems[] = [
    { title: 'Home', path: '/' },
    { title: 'Bags', path: '/bags' },
    { title: 'Sneakers', path: '/sneakers' },
    { title: 'Belts', path: '/belts' },
    { title: 'Contacts', path: '/contacts' },
  ];
  const sm = useMediaQuery('(min-width:600px)');

  return (
    <AppBar position="static" sx={classes.appBar}>
      <Toolbar sx={classes.toolBar}>
        <NextLink href="/" passHref>
          <Link sx={classes.plainAnchor} aria-label="Site logo">
            <Box sx={classes.navLogo}>
              <Image
                width={44}
                height={44}
                src="/../public/assets/img/logo.svg"
              ></Image>
              {sm && <Typography sx={classes.logoText}>E-comm</Typography>}
            </Box>
          </Link>
        </NextLink>
        <Box sx={classes.grow}></Box>
        <Box sx={classes.navContainer}>
          {menuItems.map(({ title, path }) => (
            <Box key={title}>
              <NextLink href={path} passHref>
                <Link sx={classes.plainAnchor}>
                  <Typography
                    sx={
                      title === currentTab
                        ? {
                            ...classes.tabLink,
                            ...classes.activeTabLink,
                          }
                        : classes.tabLink
                    }
                  >
                    {title}
                  </Typography>
                </Link>
              </NextLink>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
