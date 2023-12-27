import { FC } from "react";

import { Alert } from "flowbite-react";

interface AppAlertProps {
  color: "failure" | "success";
  message: string;
  onDismiss: () => void;
}

export const AppAlert: FC<AppAlertProps> = ({ message, onDismiss, color }) => {
  return (
    <Alert color={color} withBorderAccent onDismiss={onDismiss}>
      <span className="font-bold">{message}</span>
    </Alert>
  );
};
