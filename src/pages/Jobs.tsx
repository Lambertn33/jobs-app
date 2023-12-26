import { useEffect, FC } from "react";

import { useAppDispatch, useAppSelector } from "@/store/store";

import { fetchJobs } from "@/store/slices/job.slices";

import { fetchCompanies } from "@/store/slices/company.slices";

import { RootState } from "@/store/store";

import { RESPONSE_STATUSES } from "@/helpers/constants";

import { JobsList, JobsFilter } from "@/components";

export const Jobs: FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: jobs,
    status: jobsStatus,
    error: jobsError,
  } = useAppSelector((state: RootState) => state.jobs);

  const {
    data: companies,
    status: companiesStatus,
    error: companiesError,
  } = useAppSelector((state: RootState) => state.companies);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (jobsError || companiesError) return <p>Error</p>;

  if (
    jobsStatus === RESPONSE_STATUSES.LOADING ||
    companiesStatus === RESPONSE_STATUSES.LOADING
  ) {
    return <div>Loading...</div>;
  }

  if (
    jobsStatus === RESPONSE_STATUSES.FAILED ||
    companiesStatus === RESPONSE_STATUSES.FAILED
  ) {
    return <div>Error: {jobsError}</div>;
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <span className="font-bold text-2xl text-center">
        Available Jobs List
      </span>
      <JobsFilter companies={companies} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4">
        <JobsList jobs={jobs} />
      </div>
    </div>
  );
};
