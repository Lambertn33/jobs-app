import { FormEvent, useState } from "react";

import { useHistory } from "react-router-dom";

import { useAppDispatch } from "@/store/store";

import { userActions } from "@/store/slices/user.slice";

import { register, verifyEmail } from "@/api/users";

import { AuthForm } from "@/components";

import { comparePasswords } from "@/helpers/users";

interface userInputs {
  id?: number;
  names?: string;
  email: string;
  password: string;
}

interface loggedInUser {
  id: number;
  names: string;
  email: string;
}

export const Auth = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

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
    try {
      let user: loggedInUser | null = null;

      if (isLoginMode) {
        const checkUser = await verifyEmail(authInputs.email);
        if (checkUser!.length === 0) {
          setError("Invalid email provided");
          return;
        }

        if (
          !(await comparePasswords(authInputs.password, checkUser![0].password))
        ) {
          setError("Invalid password provided");
          return;
        }

        const { id, names, email } = checkUser![0];
        user = { id, names, email };
      } else {
        // Register
        const checkEmail = await verifyEmail(authInputs.email);
        if (checkEmail!.length > 0) {
          setError("The email provided has already been taken");
          return;
        }

        const { data } = await register(authInputs);
        const { id, names, email }: loggedInUser = data![0];
        user = { id, names, email };
      }

      if (user) {
        dispatch(userActions.setUser(user));
        history.replace("/profile");
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
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
