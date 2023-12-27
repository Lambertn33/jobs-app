import { FormEvent, useState } from "react";

import { register, login, verifyEmail } from "@/api/users";

import { AuthForm } from "@/components";

interface userInputs {
  id?: number;
  names?: string;
  email: string;
  password: string;
}

export const Auth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const authenticateHandler = async (
    e: FormEvent,
    inputs: userInputs,
    isLoginMode: boolean
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const authInputs: userInputs = isLoginMode
      ? {
          email: inputs.email,
          password: inputs.password,
        }
      : {
          names: inputs.names,
          email: inputs.email,
          password: inputs.password,
        };

    // Login
    if (isLoginMode) {
      const { data } = await login(authInputs);
      console.log(data);
    } else {
      // Register
      const checkEmail = await verifyEmail(authInputs.email);
      if (checkEmail! > 0) {
        setError("The email provided has already been taken");
        setIsSubmitting(false);
        return;
      }

      const { data } = await register(authInputs);
      console.log(data);
    }
  };

  return (
    <div className="flex items-center h-full justify-center">
      <AuthForm
        onAuthenticate={authenticateHandler}
        error={error}
        isSubmitting={isSubmitting}
        clearError={() => setError("")}
      />
    </div>
  );
};
