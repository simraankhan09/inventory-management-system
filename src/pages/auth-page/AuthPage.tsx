import { Button, Form, Input, Radio } from "antd";
import { useAuthPage } from "./useAuthPage";
import { getApiErrorMessage } from "../../utils/api-error-message";
import { APIResponse } from "../../types";
import { OnError } from "../../components/Notifications";
import { AxiosError } from "axios";
import { useAuth } from "../../context/auth-context";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const { user } = useAuth();
  const { pageType, form, setPageType, handleSignIn, handleSignUp } =
    useAuthPage();

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#007fff] p-2">
      <div className="max-w-[496px] w-full p-4 border-1 rounded-md border-gray-400 shadow-lg bg-white">
        <div className="mb-3 capitalize text-center">
          <h3 className="font-semibold text-[16px]">Welcome Back</h3>
          <span className="font-medium text-blue-500 text-[14px]">
            Inventory Management System
          </span>
        </div>
        <div className="flex items-center justify-center w-full p-2">
          <Radio.Group
            className="w-full"
            defaultValue={"LOGIN"}
            value={pageType}
            block
            optionType="button"
            buttonStyle="solid"
            size="small"
            options={[
              {
                label: "Sign In",
                value: "LOGIN",
              },
              {
                label: "Sign Up",
                value: "REGISTER",
              },
            ]}
            onChange={(e) => {
              setPageType(e.target.value);
            }}
          />
        </div>
        <div className="mt-5">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required field" },
                {
                  message: "Invalid email address",
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password is required field" },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          </Form>
          <div className="flex items-center justify-end gap-x-4 mt-2">
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={async () => {
                try {
                  await form.validateFields();
                } catch (error) {
                  return;
                }

                try {
                  if (pageType === "LOGIN") {
                    await handleSignIn();
                    return;
                  }
                  await handleSignUp();
                  form.resetFields();
                } catch (error) {
                  const message = getApiErrorMessage(
                    error as AxiosError<APIResponse>
                  );
                  OnError("Authentication Failed", message);
                }
              }}
            >
              {pageType === "LOGIN" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
