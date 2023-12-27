import { supabase } from "@/helpers/supabase";

import { hashPassword } from "@/helpers/users";

interface userInterface {
  id?: number;
  names?: string;
  email: string;
  password: string;
}

export const register = async (newUserData: userInterface) => {
  const { email, names, password } = newUserData;
  const hashedPassword = await hashPassword(password);
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        names,
        email,
        password: hashedPassword,
      },
    ])
    .select();
  return { data, error };
};

//Verify email and Login
export const verifyEmail = async (email: string) => {
  const { data } = await supabase.from("users").select("*").eq("email", email);
  return data;
};
