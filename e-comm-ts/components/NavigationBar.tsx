import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import styles from '../utils/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../public/assets/img/logo.svg';
import { SxProps } from '@mui/material/styles';

type NavTitles = 'Home' | 'Bags' | 'Sneakers' | 'Belts' | 'Contacts';
type NavPaths = '/' | '/bags' | '/sneakers' | '/belts' | '/contacts';

interface NavItems {
  title: NavTitles;
  path: NavPaths;
}

interface NaviationBarProps {
  currentTab: NavTitles;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  sx?: SxProps;
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
  const [value, setValue] = React.useState(0);

  const LinkTab = (props: LinkTabProps) => {
    return (
      <NextLink href={props.href || '/'} passHref>
        <Tab component="a" {...props} />
      </NextLink>
    );
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolBar}>
        <NextLink href="/" passHref>
          <Link sx={styles.plainAnchor} aria-label="Site logo">
            <Box sx={styles.navLogo}>
              <Image width={44} height={44} src={logo} alt="Site logo"></Image>
              {sm && <Typography sx={styles.logoText}>E-comm</Typography>}
            </Box>
          </Link>
        </NextLink>
        <Box sx={styles.grow}></Box>
        <Box sx={styles.navContainer}>
          <Tabs
            value={menuItems.findIndex(({ title }) => title === currentTab)}
            onChange={handleChange}
            aria-label="nav tabs example"
            variant="scrollable"
            sx={{
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {menuItems.map(({ title, path }) => (
              <LinkTab
                label={title}
                key={title}
                href={path}
                sx={
                  title === currentTab
                    ? {
                        ...styles.tabLink,
                        ...styles.activeTabLink,
                      }
                    : styles.tabLink
                }
              />
            ))}
          </Tabs>
          {/* {menuItems.map(({ title, path }) => (
            <Box key={title}>
              <NextLink href={path} passHref>
                <Link sx={styles.plainAnchor}>
                  <Typography
                    sx={
                      title === currentTab
                        ? {
                            ...styles.tabLink,
                            ...styles.activeTabLink,
                          }
                        : styles.tabLink
                    }
                  >
                    {title}
                  </Typography>
                </Link>
              </NextLink>
            </Box>
          ))} */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
