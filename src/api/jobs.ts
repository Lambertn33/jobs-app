import axios from "axios";

const jsonServerUrl = "http://localhost:3000";

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  salary: number;
  type: string;
}

interface companyInterface {
  id: number;
  name: string;
  manager: string;
  location: string;
}

export const getAllJobs = async () => {
  const [jobsResponse, companiesResponse] = await Promise.all([
    axios.get(`${jsonServerUrl}/jobs`),
    axios.get(`${jsonServerUrl}/companies`),
  ]);

  const jobs = jobsResponse.data;
  const companies = companiesResponse.data;

  const jobsWithCompanies = jobs.map((job: jobInterface) => {
    const company = companies.find(
      (c: companyInterface) => c.id === job.company_id
    );
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      type: job.type,
      salary: job.salary,
      company: {
        id: company ? company.id : -1,
        name: company ? company.name : "Unknown",
        manager: company ? company.manager : "Unknown Manager",
        location: company ? company.location : "",
      },
    };
  });

  return jobsWithCompanies;
};
