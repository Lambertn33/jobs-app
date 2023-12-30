import { FC, useState } from "react";
import { TextInput, Select } from "flowbite-react";
import { JOB_TYPES } from "@/helpers/constants";

interface companyInterface {
  id: number;
  manager: string;
  name: string;
  location: string;
}

interface JobFilters {
  title: string;
  type: string;
  company: string;
}

interface JobsFiltersProps {
  companies: companyInterface[];
  onFilter: (data: JobFilters) => void;
  companiesFetched: boolean;
}

export const JobsFilter: FC<JobsFiltersProps> = ({
  companies,
  onFilter,
  companiesFetched,
}) => {
  const [filters, setFilters] = useState({
    title: "",
    type: "",
    company: "",
  });

  const setFiltersHandler = (input: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [input]: value,
    }));
    onFilter({ ...filters, [input]: value });
  };

  return (
    <div className="flex gap-4">
      <div className="max-w-md">
        <TextInput
          data-cy="jobs-title-filter"
          type="text"
          placeholder="Search Job by title..."
          value={filters.title}
          onChange={(e) => setFiltersHandler("title", e.target.value)}
        />
      </div>

      <div className="max-w-md">
        <Select
          data-cy="jobs-types-filter"
          value={filters.type}
          onChange={(e) => setFiltersHandler("type", e.target.value)}
        >
          <option value="">Remote, Hybrid, Onsite</option>
          {Object.entries(JOB_TYPES).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div className="max-w-md">
        <Select
          data-cy="jobs-companies-filter"
          disabled={!companiesFetched}
          value={filters.company}
          onChange={(e) => setFiltersHandler("company", e.target.value)}
        >
          <option value="">All companies</option>
          {companies.map((company) => (
            <option value={company.id} key={company.id}>
              {company.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
