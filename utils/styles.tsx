const black = '#262626';
const primaryGrey = '#C1C8CE';
//const secondaryGrey = '#F6F7F8';
const primaryBlue = '#40BFFF';
const primaryRed = '#FB7181';
const neutralBlue = '#BCDDFE';
const neutralDark = '#223263';
const neutralGrey = '#9098B1';

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
    backgroundImage:
      'url(https://res.cloudinary.com/retrydp/image/upload/v1651082495/xqnzeninrst1hyh4ege9.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  bannerText: {
    margin: '280px 0px 140px 0px',
    maxWidth: '580px',
  },
  cardHeaderTextPresentation: {
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontWeight: '700',
    color: neutralDark,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '82%',
    padding: '10px',
  },
  cardHeaderText: {
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontWeight: '700',
    color: neutralDark,
  },
  cartHeaderTextPos: {
    textAlign: 'center',
    m: 0,
  },
  cardContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContentWrapperGrid: {
    m: 0,
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
    ['@media (max-width:600px)']: {
      m: '0 15px',
    },
  },
  sideMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    p: '20px',
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
  sortToolbar: {
    padding: '10px',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '15px',
  },
  goodsWrapper: {
    padding: 0,
  },
  productWrapper: {
    display: 'flex',
    flexGrow: 1,
    border: '1px solid red',
  },
  reviewsText: {
    color: primaryGrey,
    whiteSpace: 'nowrap',
  },
  cardHeaderTextSecondary: {
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontWeight: '700',
    color: neutralDark,
  },
  cardContentWrapperSecondary: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '30px',
    alignItems: 'flex-start',
    gap: '12px',
  },
  ratingBar: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 16px',
    gap: '10px',
    flexWrap: 'wrap',
  },
  customRatingBar: {
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0',
    gap: '20px',
    flexWrap: 'wrap',
  },
  productInfo: { margin: '10px 0' },
  regContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  regHeader: {
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontWeight: '700',
    color: neutralDark,
    mt: '10px',
  },
  regText: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: '400',
    color: neutralGrey,
    mt: '10px',
    mb: '50px',
  },
  adminSidebar: {
    display: 'flex',
    height: '100%',
    borderRight: '1px solid #E0E0E0',
  },
  adminModalAddProgress: {
    position: 'absolute', // as "absolute"
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  },
  cartWrapper: {
    //border: `1px solid ${primaryGrey}`,
    borderRadius: '5px',
    display: 'flex',
    padding: '15px',
  },
  cartItemText: {
    fontSize: '12px',
    fontWeight: '700',
    color: neutralDark,
    fontFamily: 'Poppins',
    ['@media (min-width:600px)']: {
      fontSize: '20px',
    },
  },
  cartInnerWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  cartItemPrice: {
    fontSize: '12px',
    fontWeight: '700',
    color: primaryBlue,
    fontFamily: 'Raleway',
    ['@media (min-width:600px)']: {
      fontSize: '30px',
    },
  },
  cartTotal: {
    mt: '15px',
    maxWidth: '350px',
    border: `1px solid ${primaryGrey}`,
    borderRadius: '5px',
    width: '100%',
  },
  paymentName: {
    fontSize: '12px',
    fontWeight: '400',
    color: primaryGrey,
    ['@media (min-width:600px)']: {
      fontSize: '1rem',
    },
  },
  paymentValues: {
    fontSize: '12px',
    fontWeight: '400',
    color: neutralDark,
    fontFamily: 'Poppins',
    ['@media (min-width:600px)']: {
      fontSize: '1rem',
    },
  },
  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
} as const;

export default styles;
