import banner from '../public/assets/img/banner.png';
const black = '#262626';
const primaryGrey = '#C1C8CE';
const secondaryGrey = '#F6F7F8';
const primaryBlue = '#40BFFF';
const primaryRed = '#FB7181';
const neutralBlue = '#BCDDFE';
const neuralDark = '#223263';

const styles = {
  grow: {
    flexGrow: 1,
  },
  layoutWrapper: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },
  navSelect: {
    m: 1,
    minWidth: 80,
  },
  navLink: {
    display: 'flex',
    fontSize: '20px',
    textDecoration: 'none',
    color: black,
    borderRadius: '50%',
    padding: '8px',
    minWidth: '20px',
    '&:hover': {
      color: primaryBlue,
    },
  },
  userActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    alignItems: 'center',
  },
  navPrice: {
    color: primaryGrey,
  },
  appBar: {
    boxShadow: 'none',
    padding: '10px 0',
    backgroundColor: 'transparent',
  },
  toolBar: {
    backgroundColor: 'transparent',
    color: black,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0',
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    minWidth: '64px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  plainAnchor: {
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: '700',
    color: black,
    whiteSpace: 'nowrap',
  },
  tabLink: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: '500',
    color: black,
    textTransform: 'uppercase',
    textDecoration: 'none',
    '&:hover': { color: primaryBlue },
  },
  activeTabLink: { color: primaryBlue },
  navContainer: {
    display: 'flex',
    gap: '80px',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ['@media (max-width:600px)']: {
      gap: '15px',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  footer: {
    display: 'flex',
    backgroundColor: neutralBlue,
    p: '50px',
  },
  banner: {
    backgroundImage: `url(${banner.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  bannerText: {
    margin: '280px 0px 140px 0px',
    maxWidth: '580px',
  },
  cardHeaderText: {
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontWeight: '700',
    color: neuralDark,
    margin: '25px 0 25px 0',
  },
  cartHeaderTextPos: {
    textAlign: 'center',
    m: 0,
  },
  cardContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    alignItems: 'center',
  },
  cardContentWrapperGrid: {
    m: 0,
    justifyContent: 'space-between',
    width: '100%',
  },
  promo: {
    display: 'flex',
    gap: '9px',
    flexWrap: 'wrap',
  },
  oldPrice: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: '400',
    color: primaryGrey,
    textDecoration: 'line-through',
  },
  percent: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: '700',
    color: primaryRed,
  },
  actualPrice: {
    fontFamily: 'Raleway',
    fontSize: '30px',
    fontWeight: '700',
    color: primaryBlue,
  },
  sectionHeader: {
    textAlign: 'center',
    mt: '64px',
  },
  tabWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    m: '35px 0',
  },
  tabItem: {
    fontFamily: 'Poppins',
    fontSize: '22px',
    fontWeight: '400',
    color: black,
    textTransform: 'capitalize',
    m: '0 36px',
  },
  sideMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    p: '20px',
    backgroundColor: secondaryGrey,
    gap: '10px',
  },
  sideLinksText: {
    color: black,
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    '&:hover': {
      color: primaryBlue,
    },
  },
  filterButton: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: '400',
    color: '#fff',
    textTransform: 'capitalize',
  },
} as const;

export default styles;
