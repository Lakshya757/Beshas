// store/slices/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ShopifyService, { ShopifyProduct } from '../../services/shopify-service';

interface ProductsState {
  products: ShopifyProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: ShopifyProduct | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (limit: number = 20) => {
    const products = await ShopifyService.getAllProducts(limit);
    return products;
  }
);

export const fetchProductByHandle = createAsyncThunk(
  'products/fetchByHandle',
  async (handle: string) => {
    const product = await ShopifyService.getProductByHandle(handle);
    return product;
  }
);

export const fetchProductsByCollection = createAsyncThunk(
  'products/fetchByCollection',
  async ({ collectionHandle, limit = 20 }: { collectionHandle: string; limit?: number }) => {
    const products = await ShopifyService.getProductsByCollection(collectionHandle, limit);
    return products;
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (searchTerm: string) => {
    const products = await ShopifyService.searchProducts(searchTerm);
    return products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ShopifyProduct[]>) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch products';
    });

    // Fetch product by handle
    builder.addCase(fetchProductByHandle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductByHandle.fulfilled, (state, action: PayloadAction<ShopifyProduct>) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProductByHandle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch product';
    });

    // Fetch products by collection
    builder.addCase(fetchProductsByCollection.fulfilled, (state, action: PayloadAction<ShopifyProduct[]>) => {
      state.loading = false;
      state.products = action.payload;
    });

    // Search products
    builder.addCase(searchProducts.fulfilled, (state, action: PayloadAction<ShopifyProduct[]>) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export const { clearSelectedProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;