import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

interface Product {
  id: number;
  product_name: string;
  category: string;
  price: number;  
  discount: number | null;
}

interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

export const fetchProduct = createAsyncThunk<Product, string>(
  'product/fetchProduct',
  async (id: string) => {
    const response = await axios.get(`/products/${id}`); 
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
