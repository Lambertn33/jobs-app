import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchJobs } from "@/store/slices/job.slices";
import { RootState } from "@/store/store";

import { RESPONSE_STATUSES } from "@/helpers/constants";

import { JobsList, JobsFilter } from "@/components";

export const Jobs: FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: jobs,
    status,
    error,
  } = useAppSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (error) return <p>Error</p>;

  if (status === RESPONSE_STATUSES.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === RESPONSE_STATUSES.FAILED) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <span className="font-bold text-2xl text-center">Jobs List</span>
      <JobsFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4">
        <JobsList jobs={jobs} />
      </div>
    </div>
  );
};
