import {  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '../public/assets/img/logo.svg';
import {
  ShoppingCart,
  People,
  Dashboard,
  ArrowBack,
} from '@mui/icons-material';
import styles from '../utils/styles';
import NextLink from 'next/link';

interface Items {
  title: 'products' | 'users' | 'dashboard';
  icon: JSX.Element;
}

interface AdminSidebarProps {
  activeTab: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab }) => {
  const menuItemsSettings: Items[] = [
    { title: 'dashboard', icon: <Dashboard /> },
    { title: 'products', icon: <ShoppingCart /> },
    { title: 'users', icon: <People /> },
  ];

  return (
    <Grid item sx={styles.adminSidebar} xl={2} lg={2} md={3} sm={12} xs={12}>
      <List sx={{ width: '100%' }} disablePadding>
        <ListItem>
          <ListItemIcon>
            <Image src={logo.src} width={45} height={45} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: '16px' }}>
                E-comm Dashboard
              </Typography>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        </ListItem>
        <Divider />
        {menuItemsSettings.map(({ title, icon }) => (
          <ListItem
            key={title}
            selected={activeTab === title}
            disablePadding
            divider
          >
            <NextLink href={`/admin/${title}`} passHref>
              <ListItemButton component="a">
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={title}
                  sx={{ textTransform: 'capitalize' }}
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
        <ListItem disablePadding divider>
          <NextLink href="/" passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText
                primary={<Typography>Home</Typography>}
                sx={{ textTransform: 'capitalize' }}
              />
            </ListItemButton>
          </NextLink>
        </ListItem>
      </List>
    </Grid>
  );
};

export default AdminSidebar;
