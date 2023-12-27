import { ChangeEvent, FC } from "react";

import { Label, TextInput } from "flowbite-react";

interface AppTextInputProps {
  id: string;
  label?: string;
  value: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AppTextInput: FC<AppTextInputProps> = ({
  id,
  label,
  value,
  type,
  onChange,
}) => {
  return (
    <div>
      {label && (
        <div className="mb-2 block">
          <Label htmlFor={id} value={label} />
        </div>
      )}
      <TextInput
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
