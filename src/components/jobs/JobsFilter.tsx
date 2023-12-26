import { TextInput, Select } from "flowbite-react";

export const JobsFilter = () => {
  return (
    <div className="flex gap-2">
      <div className="max-w-md">
        <TextInput
          id="email3"
          type="email"
          placeholder="Search Job by title..."
          required
        />
      </div>
      <div className="max-w-md">
        <Select id="countries" required>
          <option>Filter by work type</option>
          <option>Canada</option>
          <option>France</option>
          <option>Germany</option>
        </Select>
      </div>
      <div className="max-w-md">
        <Select id="countries" required>
          <option>Filter by Salary</option>
          <option>Canada</option>
          <option>France</option>
          <option>Germany</option>
        </Select>
      </div>
    </div>
  );
};
