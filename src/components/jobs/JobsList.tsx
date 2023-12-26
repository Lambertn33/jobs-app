import { FC } from "react";

import { Button, Card } from "flowbite-react";

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  company: {
    id: number;
    manager: string;
    name: string;
  };
}

interface JobsListProps {
  jobs: jobInterface[];
}

export const JobsList: FC<JobsListProps> = ({ jobs }) => {
  return jobs.map((job) => (
    <Card className="max-w-sm m-4">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {job.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {job.description.length > 300
          ? `${job.description.substring(0, 300)}...`
          : job.description}
      </p>
      <Button>Read more</Button>
    </Card>
  ));
};
