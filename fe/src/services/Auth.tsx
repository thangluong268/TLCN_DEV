import axios from "axios";
interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export const APISignUp = async ({ name, email, password }: SignUpForm) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      email,
      fullName: name,
      password,
    }
  );
  return res.data;
};

export const APILogin = async (email: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      email,
      password,
    }
  );
  return res.data;
};

export const APIForgetPassword = async (email: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgetPassword`,
    {
      email,
      password,
    }
  );
  return res.data;
};
