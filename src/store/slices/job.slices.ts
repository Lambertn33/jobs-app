import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getAllJobs } from "@/api/jobs";

import { RESPONSE_STATUSES } from "@/helpers/constants";

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  type: string;
  salary: number;
  companies: { id: number; manager: string; name: string; location: string };
}

interface jobSliceInterface {
  data: jobInterface[];
  filteredData: jobInterface[];
  isFiltering: boolean;
  status: string;
  error: string | null;
}

interface Filters {
  title: string;
  type: string;
  company: string;
}

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await getAllJobs();
  return response as jobInterface[];
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    data: [],
    isFiltering: false,
    filteredData: [],
    status: RESPONSE_STATUSES.IDLE,
    error: null,
  } as jobSliceInterface,

  reducers: {
    filterJobs: (state, action: PayloadAction<Filters>) => {
      const { title, type, company } = action.payload;
      state.isFiltering = true;
      state.filteredData = state.data.filter((job) => {
        return (
          (title === "" || job.title.toLowerCase() === title.toLowerCase()) &&
          (type === "" || job.type === type) &&
          (company === "" || job.companies.id.toString() === company)
        );
      });
    },
  },

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

export const jobsActions = jobsSlice.actions;

export default jobsSlice.reducer;
