import { supabase } from "@/helpers/supabase";

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

const GET_ALL = async <T>(
  model: string,
  query: string
): Promise<T[] | null> => {
  const { data } = await supabase.from(model).select(query);
  return data as unknown as T[];
};

export const getAllJobs = async () =>
  await GET_ALL<jobInterface>(
    "jobs",
    `id, company_id, title, description, salary, type, companies(id, name, manager, location)`
  );

export const getAllCompanies = async () =>
  await GET_ALL<companyInterface>("companies", `id, name, manager, location`);
