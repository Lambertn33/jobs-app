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
  userApplications: jobApplicationInterface[];
}

const jobApplicationsSlice = createSlice({
  name: "applications",
  initialState: {
    userApplications: [],
  } as jobApplicationSliceInterface,
  reducers: {
    setUserApplications(
      state,
      action: PayloadAction<jobApplicationInterface[]>
    ) {
      state.userApplications = action.payload;
    },
  },
});

export const jobApplicationsActions = jobApplicationsSlice.actions;

export default jobApplicationsSlice.reducer;
