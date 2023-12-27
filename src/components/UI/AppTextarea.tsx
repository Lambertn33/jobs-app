import { ChangeEvent, FC } from "react";

import { Label, Textarea } from "flowbite-react";

interface AppTextAreaProps {
  id?: string;
  label?: string;
  value?: string;
  additionalProps?: object;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AppTextarea: FC<AppTextAreaProps> = ({
  additionalProps,
  id,
  label,
  onChange,
  value,
}) => {
  return (
    <div className="max-w-md">
      {label && (
        <div className="mb-2 block">
          <Label htmlFor={id} value={label} />
        </div>
      )}
      <Textarea
        id={id}
        required
        onChange={onChange}
        value={value}
        {...additionalProps}
        rows={4}
      />
    </div>
  );
};
