import axios from "axios";

const jsonServerUrl = "http://localhost:3000";

export const getAllJobs = async () => {
  const response = await axios.get(`${jsonServerUrl}/jobs`);
  return await response.data;
};
