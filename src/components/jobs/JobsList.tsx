import { FC } from "react";

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
  return jobs.map((job) => <JobDetails job={job} key={job.id} />);
};
