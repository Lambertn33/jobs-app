import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

import { Spinner, Button } from "flowbite-react";

import { getSingleJob } from "@/api/jobs";

interface JobParamsInterface {
  jobId: string;
}

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  type: string;
  salary: number;
  companies: companyInterface;
}

interface companyInterface {
  id: number;
  manager: string;
  name: string;
  location: string;
}

export const Job = () => {
  const { jobId } = useParams<JobParamsInterface>();
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState<jobInterface | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      const data = await getSingleJob(jobId);
      setJob(data);
      setIsLoading(false);
    };
    fetchJob();
  }, [jobId]);

  return (
    <div className="py-16 flex flex-col gap-4">
      <div>
        <Link to="/jobs">
          <IoIosArrowBack className="text-primary text-3xl font-bold" />
        </Link>
      </div>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex flex-col gap-6">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400 flex flex-col">
              <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                {job?.title} position at{" "}
                <span className="font-extrabold">{job?.companies.name}</span>
              </h2>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {job?.description}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span>
                Location:{" "}
                <span className="font-bold">{job?.companies.location}</span>
              </span>
              <span>
                Work type: <span className="font-bold">{job?.type}</span>
              </span>
              <span>
                Salary: <span className="font-bold">${job?.salary}/year</span>
              </span>
            </div>
            <div>
              <Button gradientMonochrome="success"><span className="font-bold">Apply to this Job</span></Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
