import { supabase } from "@/helpers/supabase";

interface jobApplicationInterface {
  id?: number;
  user_id?: number;
  job_id: number;
  reason: string;
  portfolio: string;
  experience_years: string;
  linkedin: string;
}

const GET_ALL = async <T>(
  model: string,
  query: string,
  user_id: string
): Promise<T[] | null> => {
  const { data } = await supabase
    .from(model)
    .select(query)
    .eq("user_id", user_id);
  return data as unknown as T[];
};

export const getMyAppliedJobs = async (userId: string) =>
  await GET_ALL(
    "job_applications",
    `created_at, id, user_id, jobs(id, title, companies(name, location))`,
    userId
  );

export const createApplication = async (
  newJobApplication: jobApplicationInterface
) => {
  const { experience_years, job_id, linkedin, portfolio, reason, user_id } =
    newJobApplication;
  const { data } = await supabase
    .from("job_applications")
    .insert([
      {
        experience_years,
        job_id,
        linkedin,
        portfolio,
        reason,
        user_id,
      },
    ])
    .select();
  return { data };
};
