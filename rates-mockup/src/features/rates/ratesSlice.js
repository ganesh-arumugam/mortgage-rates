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
const getData = async (url) => {
  const resp = await fetch(url, {
    headers: {
      Authorization: "OU-AUTH 68028256-2296-47a0-b107-25128e99f648",
    },
  });
  const data = resp.ok ? await resp.json() : null;
  console.log(data);
  return data;
};

// Async thunk api for handling side effects
export const fetchData = (url) => async (dispatch) => {
  try {
    dispatch(getRatesStart());
    const data = await getData(url);
    dispatch(getRatesSuccess(data));
  } catch (err) {
    dispatch(getRatesFailure(err));
  }
};
