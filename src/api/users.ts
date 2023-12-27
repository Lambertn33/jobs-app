import { supabase } from "@/helpers/supabase";

interface userInterface {
  id?: number;
  names: string;
  email: string;
  password?: string;
}

export const register = async (newUserData: userInterface) => {
  const { email, names, password } = newUserData;
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        names,
        email,
        password,
      },
    ])
    .select();
  return { data, error };
};

export const login = async (userData: userInterface) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", userData.email)
    .eq("password", userData.password);
  return data;
};

export const verifyEmail = async (email: string) =>
  await supabase.from("users").select("*").eq("email", email);
