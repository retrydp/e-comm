import axios from 'axios';export interface Options {
  apiUrl: string;
  method: string;
  data?: string;
  withAuth?: boolean;
  token?: string;
  multipart?: boolean;
  dynamicUrl?: boolean;
}

const apiRequestGenerator = <RequestType, ResponseType>({
  apiUrl,
  method,
  data,
  token,
  multipart,
  dynamicUrl,
}: Options) => {
  const headers = {
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (dynamicUrl) {
    //something like axios.get(url)(id) -> url/id
    return (id: string) =>
      axios[method]<RequestType, ResponseType>(`${apiUrl}/${id}`, data, {
        headers,
      });
  }
  return axios[method]<RequestType, ResponseType>(apiUrl, data, {
    headers,
  });
};

export default apiRequestGenerator;
