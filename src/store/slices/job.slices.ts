import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getAllJobs } from "@/api/jobs";

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

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async () => {
    const response = await getAllJobs();
    return response;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: { data: [], status: "idle", error: null } as jobSliceInterface,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, action: PayloadAction<jobInterface[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default jobsSlice.reducer;
