import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import AuthService from "../../config/auth/AuthService";

const API_URL = import.meta.env.VITE_API_URL;
export const createPrice = createAsyncThunk(
  "price/createPrice",
  async (priceData, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/price`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getAuthToken()}`,
        },
        body: JSON.stringify(priceData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Price Creation failed");
      }
      return await res.json();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updatePrice = createAsyncThunk(
  "price/updatePrice",
  async ({ priceData, priceId }, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/price/${priceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getAuthToken()}`,
        },
        body: JSON.stringify(priceData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Price Creation failed");
      }
      return await res.json();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllPrice = createAsyncThunk(
  "price/getAllPrices",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/price`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAuthToken()}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch Prices");
      }
      return await res.json();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const priceSlice = createSlice({
  name: "price",
  initialState: {
    price: null,
    prices: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPriceState: (state) => {
      state.price = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.price = action.payload;
        state.success = true;
      })
      .addCase(createPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getAllPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })
      .addCase(getAllPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPriceState } = priceSlice.actions;
export default priceSlice.reducer;
