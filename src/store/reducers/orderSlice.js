import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../config/auth/AuthService";

const API_URL=import.meta.env.VITE_API_URL;

// ✅ Async thunk for placing an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if protected route
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Order creation failed");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAuthToken()}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch orders");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllUserOrders = createAsyncThunk(
  "order/getAllUserOrders",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch orders");
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    orders: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
    .addCase(getAllOrders.pending, (state) => {
    state.loading = true;
    })
    .addCase(getAllOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
    })
    .addCase(getAllOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    })
    .addCase(getAllUserOrders.pending, (state) => {
    state.loading = true;
    })
    .addCase(getAllUserOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
    })
    .addCase(getAllUserOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    });

  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
