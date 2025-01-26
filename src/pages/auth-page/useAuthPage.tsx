import { Form } from "antd";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";

export interface UserAuth {
  email: string;
  password: string;
}

export const useAuthPage = () => {
  const { signIn, signUp } = useAuth();
  const [form] = Form.useForm<UserAuth>();
  const [pageType, setPageType] = useState<"LOGIN" | "REGISTER">("LOGIN");

  const handleSignIn = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const { email, password } = form.getFieldsValue();
        await signIn(email, password);
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const handleSignUp = () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const { email, password } = form.getFieldsValue();
        await signUp(email, password);
        setPageType("LOGIN");
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  return {
    pageType,
    form,
    setPageType,
    handleSignIn,
    handleSignUp,
  };
};
