import { FC } from "react";

import { Link } from "react-router-dom";

import { Button, Badge, Card } from "flowbite-react";

import { FaBuilding } from "react-icons/fa";

import { FcManager } from "react-icons/fc";

import { FaLocationDot, FaSackDollar } from "react-icons/fa6";

import { JOB_TYPES } from "@/helpers/constants";

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  type: string;
  salary: number;
  companies: {
    id: number;
    manager: string;
    name: string;
    location: string;
  };
}

interface JobDetailsProps {
  job: jobInterface;
}

const RenderJobAdditionalInfo: FC<JobDetailsProps> = ({ job }) => {
  const { companies, salary, type } = job;

  const badgeColor =
    type === JOB_TYPES.ONSITE
      ? "failure"
      : type === JOB_TYPES.HYBRID
      ? "warning"
      : "success";

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <FaBuilding />
          <span className="text-xs font-semibold">{companies.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaLocationDot className="text-xl" />
          <span className="text-xs font-semibold">{companies.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <FcManager className="text-xl" />
          <span className="text-xs font-semibold">{companies.manager}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <FaSackDollar />
          <span className="text-xs font-semibold">${salary}/year</span>
        </div>
        <div className="flex items-center gap-1">
          <Badge size="xs" icon={FaLocationDot} color={badgeColor}>
            {type}
          </Badge>
        </div>
      </div>
    </div>
  );
};
export const JobDetails: FC<JobDetailsProps> = ({ job }) => {
  const { id, title, description } = job;

  return (
    <Card className="max-w-md my-4">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description.length > 300
          ? `${description.substring(0, 300)}...`
          : description}
      </p>
      <RenderJobAdditionalInfo job={job} />
      <Button gradientMonochrome="success" as={Link} to={`/jobs/${id}`}>
        Read more
      </Button>
    </Card>
  );
};
