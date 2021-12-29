const black = '#000';
const primaryGrey = '#C1C8CE';

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
} as const;

export default classes;
