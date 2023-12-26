import { supabase } from "@/helpers/supabase";

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  type: string;
  salary: number;
  companies: { id: number; manager: string; name: string; location: string };
}

export const getAllJobs = async () => {
  const { data } = await supabase
    .from("jobs")
    .select(
      `id, company_id, title, description, salary, type, companies(id, name, manager, location)`
    );

  return data as unknown as jobInterface[];
};
