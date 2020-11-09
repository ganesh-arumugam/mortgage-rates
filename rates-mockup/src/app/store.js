import { configureStore } from "@reduxjs/toolkit";

import ratesReducer from "../features/rates/ratesSlice";

export default configureStore({
  reducer: {
    rates: ratesReducer,
  },
});
