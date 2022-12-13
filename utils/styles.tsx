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

  jcsb: {
    justifyContent: 'space-between',
  },

  aic: {
    alignItems: 'center',
  },

  mr10: {
    mr: '10px',
  },

  mw150: {
    minWidth: '150px',
  },

  mw300: {
    minWidth: '300px',
  },

  mw90p: {
    maxWidth: '90%',
  },

  mCenter: {
    m: '0 auto',
  },

  m15: {
    m: '15px',
  },

  mb4: {
    mb: 4,
  },

  mb10: {
    mb: '10px',
  },

  mb15: {
    mb: '15px',
  },

  mb20: {
    mb: '20px',
  },

  mt2: {
    mt: 2,
  },

  mt15: {
    mt: '15px',
  },

  mt64: {
    mt: '64px',
  },

  mt60: {
    mt: '60px',
  },

  p7: {
    p: '7px',
  },

  colorRed: {
    color: 'red',
  },

  neutralBg: {
    bgcolor: neutralBlue,
  },

  blueBg: {
    bgcolor: primaryBlue,
  },

  capitalize: {
    textTransform: 'capitalize',
  },

  textCenter: {
    textAlign: 'center',
  },

  textLeft: {
    textAlign: 'left',
  },

  textH4: {
    typography: 'h4',
  },

  fullWidth: {
    width: '100%',
  },

  defaultP: {
    p: '15px 0',
  },

  mediumFontSize: {
    fontSize: '16px',
  },

  fz20: {
    fontSize: '20px',
  },

  headerBar: {
    borderBottom: 1,
    borderColor: 'divider',
    width: '100%',
    backgroundColor: 'white',
    boxShadow: 'none',
  },

  headerLink: {
    textDecoration: 'none',
    color: 'black',
  },

  layoutWrapper: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
  },

  headerLogoutButton: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '1rem',
    padding: '2px 0',
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
    p: '8px',
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
    p: '10px 0',
    backgroundColor: 'transparent',
  },

  toolBar: {
    backgroundColor: 'transparent',
    color: black,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    p: '0',
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
    '&:hover': {
      color: primaryBlue,
    },
  },

  activeTabLink: {
    color: primaryBlue,
  },

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
    m: '280px 0px 140px 0px',
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
    p: '10px',
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

  cardButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  promo: {
    display: 'flex',
    gap: '9px',
    flexWrap: 'wrap',
  },

  promoPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
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
    p: '10px',
    flexWrap: 'wrap',
    gap: '8px',
    mb: '15px',
  },

  sortToolbarInner: {
    display: 'flex',
    gap: '60px',
    alignItems: 'center',
  },

  goodsWrapper: {
    p: 0,
  },

  goodsItemsText: {
    fontSize: '16px',
    paddingLeft: '20px',
  },

  goodsNotFoundWrapper: {
    mb: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
    gap: '15px',
  },

  productWrapper: {
    display: 'flex',
    flexGrow: 1,
    border: '1px solid red',
  },

  productDivider: {
    borderBottom: 1,
    borderColor: 'divider',
  },

  productContainerWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },

  productContainerSecondary: {
    mb: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
    gap: '15px',
  },

  productHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  reviewsText: {
    color: primaryGrey,
    whiteSpace: 'nowrap',
  },

  productButtonWrapper: {
    display: 'flex',
    margin: '20px 0',
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
    mt: '30px',
    alignItems: 'flex-start',
    gap: '12px',
  },

  cardContentOuterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  ratingBar: {
    display: 'flex',
    alignItems: 'center',
    m: '0 16px',
    gap: '10px',
    flexWrap: 'wrap',
  },

  ratingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  ratingButtonText: {
    fontSize: '14px',
    textTransform: 'none',
  },

  customRatingBar: {
    display: 'flex',
    alignItems: 'center',
    m: '15px 0',
    gap: '20px',
    flexWrap: 'wrap',
  },

  ratingDivider: {
    m: '0 15px',
  },

  productInfo: {
    m: '10px 0',
  },

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

  adminSidebarWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 5px',
    gap: '5px',
    alignItems: 'center',
  },

  adminModalAddProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  },

  cartWrapper: {
    borderRadius: '5px',
    display: 'flex',
    p: '15px',
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

  cartOuter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
  },

  cartOuterText: {
    textAlign: 'left',
    maxWidth: '350px',
    width: '100%',
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

  cartTotalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    p: '15px',
    width: '100%',
    gap: '25px',
  },

  cartTotalText: {
    mt: '15px',
    textAlign: 'left',
    maxWidth: '350px',
    width: '100%',
  },

  cartTotalButton: {
    maxWidth: '350px',
    width: '100%',
    mt: '15px',
  },

  cartContainer: {
    mb: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
    gap: '15px',
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

  footerText: {
    maxWidth: '220px',
    fontSize: '12px',
  },

  footerHeader: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: '700',
  },

  footerItemWrapper: {
    display: 'flex',
    gap: '20px 0px',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    mb: '20px',
  },

  breadcrumbHomeButton: {
    p: 1,
  },

  breadcrumbsButton: {
    p: 1,
    textTransform: 'capitalize',
  },

  breadcrumbsText: {
    ml: 2,
    fontSize: '0.875rem',
    textTransform: 'capitalize',
  },

  listCard: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  moduleContainer: {
    p: '15px 0',
  },

  tabsIndicator: {
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },

  pagination: {
    m: '0, auto',
    p: '24px',
  },

  sideMenuForm: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
  },

  favoritesContainer: {
    mb: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
    gap: '15px',
  },

  skeletonMin: {
    maxWidth: '100%',
    borderRadius: '30px',
  },

  skeletonInner: {
    maxWidth: '100%',
    mb: '15px',
  },

  skeletonCustom: {
    borderRadius: '5px',
  },

  reviewButton: {
    fontSize: '14px',
    textTransform: 'none',
  },

  avatar: {
    width: 50,
    height: 50,
  },

  dataGrid: {
    height: 800,
    width: '100%',
  },

  userSidebar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 5px',
    gap: '5px',
    alignItems: 'center',
  },

  preview: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
  },

  previewImage: {
    width: '100%',
    maxWidth: '500px',
  },
} as const;

export default styles;
