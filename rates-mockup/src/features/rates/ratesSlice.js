import { createSlice } from "@reduxjs/toolkit";

export const ratesSlice = createSlice({
  name: "rates",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getRatesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRatesSuccess(state, action) {
      const { rateQuotes } = action.payload;
      state.data = rateQuotes;
      state.loading = false;
      state.error = null;
    },
    getRatesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRatesStart,
  getRatesSuccess,
  getRatesFailure,
} = ratesSlice.actions;
export default ratesSlice.reducer;

// Async fetch request for data
const getData = async (url, apiKey) => {
  const resp = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  });
  const data = await resp.json();
  return { ok: resp.ok, data };
};

// Async thunk api for handling side effects
export const fetchData = (url, apiKey) => async (dispatch) => {
  try {
    dispatch(getRatesStart());
    const { ok, data } = await getData(url, apiKey);
    if (!ok) throw new Error(data.errors[0]);
    dispatch(getRatesSuccess(data));
  } catch (err) {
    dispatch(getRatesFailure(err.message));
  }
};
