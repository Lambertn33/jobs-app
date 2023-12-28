import { FC } from "react";

import { Table } from "flowbite-react";
import { formatDate } from "@/helpers/date";

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

interface JobApplicationsProps {
  applications: jobApplicationInterface[];
}

export const JobApplications: FC<JobApplicationsProps> = ({ applications }) => {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Job Title</Table.HeadCell>
          <Table.HeadCell>Company Name</Table.HeadCell>
          <Table.HeadCell>Company Location</Table.HeadCell>
          <Table.HeadCell>Applied Date</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {applications.map((application) => (
            <Table.Row
              key={application.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <span className="font-bold">{application.jobs.title}</span>
              </Table.Cell>
              <Table.Cell>{application.jobs.companies.name}</Table.Cell>
              <Table.Cell>{application.jobs.companies.location}</Table.Cell>
              <Table.Cell>
                {formatDate(application.created_at.toString())}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
