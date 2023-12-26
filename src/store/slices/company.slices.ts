import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getAllCompanies } from "@/api/jobs";

import { RESPONSE_STATUSES } from "@/helpers/constants";

interface companyInterface {
  id: number;
  manager: string;
  name: string;
  location: string;
}

interface companySliceInterface {
  data: companyInterface[];
  status: string;
  error: string | null;
}

export const fetchCompanies = createAsyncThunk("jobs/fetchCompanies", async () => {
  const response = await getAllCompanies();
  return response as companyInterface[];
});

const companysSlice = createSlice({
  name: "companies",
  initialState: {
    data: [],
    status: RESPONSE_STATUSES.IDLE,
    error: null,
  } as companySliceInterface,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = RESPONSE_STATUSES.LOADING;
      })
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<companyInterface[]>) => {
          state.status = RESPONSE_STATUSES.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = RESPONSE_STATUSES.FAILED;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default companysSlice.reducer;
