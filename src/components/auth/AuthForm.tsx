import { FC, FormEvent, useState } from "react";

import { Button } from "flowbite-react";

import { AppTextInput, AppAlert } from "..";

interface userInterface {
  id?: number;
  names?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  onAuthenticate(
    e: FormEvent,
    userInputs: userInterface,
    isLoginMode: boolean
  ): void;
  error: string;
  isSubmitting: boolean;
  clearError: () => void;
}

export const AuthForm: FC<AuthFormProps> = ({
  onAuthenticate,
  error,
  isSubmitting,
  clearError
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userInputs, setUserInputs] = useState<userInterface>({
    email: "",
    names: "",
    password: "",
  });

  const changeInputHandler = (input: string, value: string) => {
    setUserInputs((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const toggleMode = () => setIsLoginMode(!isLoginMode);

  const hasError = error.trim().length > 0;

  const submitForm = (e: FormEvent) => {
    onAuthenticate(e, userInputs, isLoginMode);
  };

  return (
    <div className="w-full h-full py-8">
      <form
        onSubmit={submitForm}
        className="flex max-w-full sm:max-w-full md:max-w-[100%] lg:max-w-[30%] mx-auto flex-col gap-4 bg-gray-200 p-8 rounded-md"
      >
        {hasError && (
          <AppAlert color="failure" message={error} onDismiss={() => clearError()} />
        )}
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl">
            Sign {isLoginMode ? "in" : "up"}
          </h2>
        </div>

        {!isLoginMode && (
          <AppTextInput
            label="Your names"
            id="names"
            type="text"
            value={userInputs.names!}
            onChange={(e) => changeInputHandler("names", e.target.value)}
          />
        )}

        <AppTextInput
          id="email"
          label="Your email"
          type="email"
          value={userInputs.email}
          onChange={(e) => changeInputHandler("email", e.target.value)}
        />

        <AppTextInput
          id="password"
          label="Your password"
          type="password"
          value={userInputs.password}
          onChange={(e) => changeInputHandler("password", e.target.value)}
        />

        <Button gradientMonochrome="success" type="submit" disabled={isSubmitting}>
          <span className="font-bold">
            {isSubmitting
              ? "Please wait..."
              : isLoginMode
              ? "Login"
              : "Register"}
          </span>
        </Button>
        <span
          onClick={toggleMode}
          className="text-xs cursor-pointer text-[#0e7490]"
        >
          {isLoginMode ? "No Account yet?" : "Already have an account?"}
        </span>
      </form>
    </div>
  );
};
