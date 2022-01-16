import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Link,
  Slider,
  Typography,
} from '@mui/material';
import React from 'react';
import { Layout } from '../components';
import styles from '../utils/styles';
import NextLink from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type hdLinks = 'Nike' | 'Airmax' | 'Adidas' | 'Vans';

const Bags = () => {
  const hotDealsLinks: hdLinks[] = ['Nike', 'Airmax', 'Adidas', 'Vans'];
  const [sliderValue, setSliderValue] = React.useState<number[]>([0, 331]);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const md = useMediaQuery('(max-width:900px)');

  const sliderHandleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  const accordionHandleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const sliderValueText = () => {
    return `Price range: $ ${sliderValue[0]} to $ ${sliderValue[1]}`;
  };

  return (
    <Layout title="Bags">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {md ? (
            <Grid item lg={12} sx={{ width: '100%' }}>
              <Accordion
                expanded={expanded === 'filterSetings'}
                onChange={accordionHandleChange('filterSetings')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="filterSetingsbh-content"
                  id="filterSetingsbh-header"
                >
                  <Typography variant="h4" component="h4">
                    Search filters
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item container rowSpacing={2} direction="column">
                    {/* side bar menu */}
                    <Grid item sx={styles.grow}>
                      <Box sx={styles.sideMenuItem}>
                        <Typography variant="h4" sx={{ mb: '10px' }}>
                          Brand
                        </Typography>
                        {hotDealsLinks.map((el) => (
                          <NextLink href="/" passHref key={el}>
                            <Link sx={styles.sideLinksText}>
                              <Typography>{el}</Typography>
                              <Typography>TBA</Typography>
                            </Link>
                          </NextLink>
                        ))}
                      </Box>
                    </Grid>
                    <Grid item sx={styles.grow}>
                      <Box sx={styles.sideMenuItem}>
                        <Typography variant="h4" sx={{ mb: '10px' }}>
                          Prices
                        </Typography>
                        <Typography>
                          Ranger: $ {sliderValue[0]} - $ {sliderValue[1]}
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                          <Slider
                            min={0}
                            max={331}
                            step={10}
                            getAriaLabel={(idx: number) =>
                              idx ? `Maximum value` : `Minimum value`
                            }
                            value={sliderValue}
                            onChange={sliderHandleChange}
                            //TODO API request according to folowing methods to prevent unnecessary calls
                            onMouseUp={(e) => console.log(sliderValue, e.type)}
                            onTouchEnd={(e) => console.log(sliderValue, e.type)}
                            valueLabelDisplay="off"
                            getAriaValueText={sliderValueText}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sx={styles.grow}>
                      <Box sx={styles.sideMenuItem}>
                        <Typography variant="h4" sx={{ mb: '10px' }}>
                          Colors
                        </Typography>
                        item bl0o9ck
                      </Box>
                    </Grid>
                    <Grid item sx={styles.grow}>
                      <Box sx={styles.sideMenuItem}>item bl0o9ck</Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ) : (
            <Grid
              item
              xl={3}
              lg={3}
              md={3}
              container
              rowSpacing={2}
              direction="column"
            >
              {/* side bar menu */}
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>
                  <Typography variant="h4" sx={{ mb: '10px' }}>
                    Brand
                  </Typography>
                  {hotDealsLinks.map((el) => (
                    <NextLink href="/" passHref key={el}>
                      <Link sx={styles.sideLinksText}>
                        <Typography>{el}</Typography>
                        <Typography>TBA</Typography>
                      </Link>
                    </NextLink>
                  ))}
                </Box>
              </Grid>
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>
                  <Typography variant="h4" sx={{ mb: '10px' }}>
                    Prices
                  </Typography>
                  <Typography>
                    Ranger: $ {sliderValue[0]} - $ {sliderValue[1]}
                  </Typography>
                  <Box sx={{ width: '100%' }}>
                    <Slider
                      min={0}
                      max={331}
                      step={10}
                      getAriaLabel={(idx: number) =>
                        Boolean(idx) ? 'Maximum price' : 'Minimum price'
                      }
                      value={sliderValue}
                      onChange={sliderHandleChange}
                      //TODO API request according to folowing methods to prevent unnecessary calls
                      onMouseUp={(e) => console.log(sliderValue, e.type)}
                      onTouchEnd={(e) => console.log(sliderValue, e.type)}
                      valueLabelDisplay="off"
                      getAriaValueText={sliderValueText}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>
                  <Typography variant="h4" sx={{ mb: '10px' }}>
                    Colors
                  </Typography>
                  item bl0o9ck
                </Box>
              </Grid>
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>item bl0o9ck</Box>
              </Grid>
            </Grid>
          )}

          <Grid item>main content</Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Bags;
