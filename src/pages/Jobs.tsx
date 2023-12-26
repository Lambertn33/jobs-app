import  { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchJobs } from "@/store/slices/job.slices";
import { RootState } from "@/store/store";

export const Jobs:FC  = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  
  if (error) return <p>Error</p>;
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  console.log(data);
  return (
    <div>Jobs</div>
  )
}
