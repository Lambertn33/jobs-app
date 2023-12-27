import { useEffect, FC } from "react";

import { Spinner } from "flowbite-react";

import { useAppDispatch, useAppSelector } from "@/store/store";

import { fetchJobs, jobsActions } from "@/store/slices/job.slices";

import { fetchCompanies } from "@/store/slices/company.slices";

import { RootState } from "@/store/store";

import { RESPONSE_STATUSES } from "@/helpers/constants";

import { JobsList, JobsFilter } from "@/components";

interface JobFilters {
  title: string;
  type: string;
  company: string;
}

export const Jobs: FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: jobs,
    filteredData: filteredJobs,
    status: jobsStatus,
    error: jobsError,
    isFiltering,
  } = useAppSelector((state: RootState) => state.jobs);

  const {
    data: companies,
    status: companiesStatus,
    error: companiesError,
  } = useAppSelector((state: RootState) => state.companies);

  // filter jobs
  const filterHandler = (filters: JobFilters) =>
    dispatch(jobsActions.filterJobs(filters));

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchJobs());
      await dispatch(fetchCompanies());
    };

    fetchData();
  }, [dispatch]);

  if (jobsError || companiesError) return <p>Error</p>;

  if (
    jobsStatus === RESPONSE_STATUSES.LOADING ||
    companiesStatus === RESPONSE_STATUSES.LOADING
  ) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
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
      <JobsFilter companies={companies} onFilter={filterHandler} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4">
        <JobsList jobs={isFiltering ? filteredJobs : jobs} />
      </div>
    </div>
  );
};
