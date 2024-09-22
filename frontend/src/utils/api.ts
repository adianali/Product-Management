import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
export const getProducts = () => apiClient.get('/products');
export const getProductById = (id: string) => apiClient.get(`/products/${id}`);
export const createProduct = (productData: any) => apiClient.post('/products', productData);
export const updateProduct = (id: string, productData: any) => apiClient.put(`/products/${id}`, productData);
export const deleteProduct = (id: number) => apiClient.delete(`/products/${id}`);
