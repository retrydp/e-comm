import { Options } from './apiRequestGenerator';
const apiRoutes = {
  USERS_LOGIN: '/api/users/login',
  USER_REGISTER: '/api/users/register',
  ADMIN_PRODUCT: `/api/admin/product/`,
  ADMIN_PRODUCT_ADD: `/api/admin/product/add`,
  ADMIN_UPLOAD: '/api/admin/upload',
  ADMIN_USER: `/api/admin/user/`,
  ADMIN_USERS: `/api/admin/users`,
  ADMIN_PRODUCTS: `/api/admin/products`,
};

const apiConstants: Record<string, Options> = {
  loginRequest: {
    apiUrl: apiRoutes.USERS_LOGIN,
    method: 'post',
    withAuth: true,
  },
  registerRequest: {
    apiUrl: apiRoutes.USER_REGISTER,
    method: 'post',
    withAuth: true,
  },
  adminGetProductRequest: {
    apiUrl: apiRoutes.ADMIN_PRODUCT,
    method: 'get',
    withAuth: true,
    multipart: true,
    dynamicUrl: true,
  },
  adminAddProductRequest: {
    apiUrl: apiRoutes.ADMIN_PRODUCT_ADD,
    method: 'put',
    withAuth: true,
  },
  adminImageUploadRequest: {
    apiUrl: apiRoutes.ADMIN_UPLOAD,
    method: 'post',
    multipart: true,
    withAuth: true,
  },
  adminEditUserRequest: {
    apiUrl: apiRoutes.ADMIN_USER,
    method: 'patch',
    withAuth: true,
    dynamicUrl: true,
  },
  adminDeleteUserRequest: {
    apiUrl: apiRoutes.ADMIN_USERS,
    method: 'delete',
    withAuth: true,
  },
  adminGetUsersRequest: {
    apiUrl: apiRoutes.ADMIN_USERS,
    method: 'get',
    withAuth: true,
  },
  adminGetUserRequest: {
    apiUrl: apiRoutes.ADMIN_USER,
    method: 'get',
    withAuth: true,
    dynamicUrl: true,
  },
  adminDeleteProductRequest: {
    apiUrl: apiRoutes.ADMIN_PRODUCTS,
    method: 'delete',
    withAuth: true,
  },
  adminGetProductsRequest: {
    apiUrl: apiRoutes.ADMIN_PRODUCTS,
    method: 'get',
    withAuth: true,
  },
};
export default apiConstants;
//TODO add more constants here, Done: admin requests, token should be provided at pregenerator in context
