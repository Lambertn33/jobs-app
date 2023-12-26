import { FC } from "react";

import { TextInput, Select } from "flowbite-react";

import { JOB_TYPES } from "@/helpers/constants";

interface companyInterface {
  id: number;
  manager: string;
  name: string;
  location: string;
}

interface JobsFiltersProps {
  companies: companyInterface[];
}

export const JobsFilter: FC<JobsFiltersProps> = ({ companies }) => {
  return (
    <div className="flex gap-2">
      <div className="max-w-md">
        <TextInput type="text" placeholder="Search Job by title..." />
      </div>
      <div className="max-w-md">
        <Select>
          <option value="">Filter by work type</option>
          {Object.entries(JOB_TYPES).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>
      <div className="max-w-md">
        <Select>
          <option value="">Filter by company</option>
          {companies.map((company) => (
            <option value={company.id} key={company.id}>{company.name}</option>
          ))}
        </Select>
      </div>
    </div>
  );
};
