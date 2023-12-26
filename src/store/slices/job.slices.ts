import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getAllJobs } from "@/api/jobs";

import { RESPONSE_STATUSES } from "@/helpers/constants";

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
}

interface jobSliceInterface {
  data: jobInterface[];
  status: string;
  error: string | null;
}

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await getAllJobs();
  return response;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    data: [],
    status: RESPONSE_STATUSES.IDLE,
    error: null,
  } as jobSliceInterface,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = RESPONSE_STATUSES.LOADING;
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, action: PayloadAction<jobInterface[]>) => {
          state.status = RESPONSE_STATUSES.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = RESPONSE_STATUSES.FAILED;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default jobsSlice.reducer;
