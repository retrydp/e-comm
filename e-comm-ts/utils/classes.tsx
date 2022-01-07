const black = '#262626';
const primaryGrey = '#C1C8CE';
const primaryBlue = '#40BFFF';

const classes = {
  grow: {
    flexGrow: 1,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    ['@media (max-width:600px)']: {
      gap: '15px',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
} as const;

export default classes;
