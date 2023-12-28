import { useEffect, useState } from "react";

import { Spinner } from "flowbite-react";

import { useAppSelector, useAppDispatch } from "@/store/store";

import { getMyAppliedJobs } from "@/api/applications";

import { jobApplicationsActions } from "@/store/slices/applications.slice";

import { JobApplications } from "@/components";

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

export const Applications = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [userApplications, setUserApplications] = useState<
    jobApplicationInterface[]
  >([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      setIsLoading(true);
      const myJobs = (await getMyAppliedJobs(
        user!.id.toString()
      )) as jobApplicationInterface[];
      setUserApplications(myJobs);
      dispatch(jobApplicationsActions.setUserApplications(myJobs));
      setIsLoading(false);
    };
    fetchMyJobs();
  }, [user, dispatch]);

  return (
    <div className="py-8 flex flex-col gap-6">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <span className="text-3xl font-bold">My Applications</span>
          </div>
          <JobApplications applications={userApplications} />
        </>
      )}
    </div>
  );
};
