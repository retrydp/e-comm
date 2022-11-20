import {  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Facebook, Twitter } from '@mui/icons-material';
import React from 'react';
import styles from '../utils/styles';
import NextLink from 'next/link';
import Image from 'next/image';

const Footer: React.FC = (): JSX.Element => {
  return (
    <Box sx={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <NextLink href="/" passHref>
              <Link sx={styles.plainAnchor} aria-label="Site logo">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    mb: '20px',
                  }}
                >
                  <Image
                    width={44}
                    height={44}
                    src="https://res.cloudinary.com/retrydp/image/upload/v1651478617/xmqphhxdjbtivv8o3lrm.svg"
                    alt="Site logo"
                  ></Image>
                  <Typography sx={styles.logoText}>E-comm</Typography>
                </Box>
              </Link>
            </NextLink>
            <Typography sx={styles.footerText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever.Since the 1500s, when an unknown printer.
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={styles.footerItemWrapper}>
              <Typography sx={styles.footerHeader}>Follow Us</Typography>
              <Typography sx={styles.footerText}>
                Since the 1500s, when an unknown printer took a galley of type
                and scrambled.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete">
                  <Facebook />
                </IconButton>
                <IconButton aria-label="delete">
                  <Twitter />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={styles.footerItemWrapper}>
              <Typography sx={styles.footerHeader}>Contact Us</Typography>
              <Typography sx={styles.footerText}>
                E-Comm , 4578 Marmora Road, Glasgow D04 89GR
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
