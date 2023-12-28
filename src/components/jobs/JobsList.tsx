import { FC } from "react";

import { useAppSelector } from "@/store/store";

import { JobDetails } from "..";

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  salary: number;
  type: string;
  companies: {
    id: number;
    manager: string;
    name: string;
    location: string;
  };
}

interface JobsListProps {
  jobs: jobInterface[];
}

export const JobsList: FC<JobsListProps> = ({ jobs }) => {
  const { user } = useAppSelector((state) => state.user);
  const { userApplications } = useAppSelector((state) => state.applications);

  const isLoggedIn = !!user;

  const isJobAlreadyApplied = (jobId: number): boolean => {
    if (isLoggedIn && userApplications) {
      return userApplications.some(
        (application) => application.jobs.id === jobId
      );
    }
    return false;
  };

  return jobs.length ? (
    jobs.map((job) => (
      <JobDetails
        job={job}
        key={job.id}
        isJobAlreadyApplied={isJobAlreadyApplied(job.id)}
      />
    ))
  ) : (
    <span>No Jobs found</span>
  );
};
