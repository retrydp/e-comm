const apiRoutes = {
  USERS_LOGIN: '/api/users/login',
  USER_REGISTER: '/api/users/register',
  ADMIN_PRODUCT: `/api/admin/product/`,
  ADMIN_PRODUCT_ADD: `/api/admin/product/add`,
  ADMIN_UPLOAD: '/api/admin/upload',
  ADMIN_USER: `/api/admin/user/`,
  ADMIN_USERS: `/api/admin/users`,
  ADMIN_PRODUCTS: `/api/admin/products`,
  USER_FAVORITE: `/api/users/favorite`,
  USER_PRESENTATION: `/api/presentation`,
} as const;

export default apiRoutes;
