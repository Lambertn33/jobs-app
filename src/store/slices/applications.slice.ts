import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface jobApplicationInterface {
  id: number;
  user_id: number;
  created_at: Date;
  jobs: {
    id: number;
    title: string;
    companies: {
      name: string;
      location: string;
    };
  };
}

interface jobApplicationSliceInterface {
  userJobs: jobApplicationInterface[];
}

const jobApplicationsSlice = createSlice({
  name: "applications",
  initialState: {
    userJobs: [],
  } as jobApplicationSliceInterface,
  reducers: {
    setUserApplications(
      state,
      action: PayloadAction<jobApplicationInterface[]>
    ) {
      state.userJobs = action.payload;
    },
  },
});

export const jobApplicationsActions = jobApplicationsSlice.actions;

export default jobApplicationsSlice.reducer;
