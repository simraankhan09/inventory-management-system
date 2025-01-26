import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { APIResponse, User } from "../types";
import { ServiceFactory } from "../service/service-factory";
import { env } from "../service/config";
import { Spin } from "antd";

type IAuthContext = {
  signIn: (email: string, password: string) => Promise<APIResponse>;
  signUp: (email: string, password: string) => Promise<APIResponse>;
  signOut: () => void;
  user?: User | null;
};

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const serviceFactory = ServiceFactory.getInstance(env);

  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      env.token = `Bearer ${t}`;
    }
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const response = await serviceFactory.getAuthService().getUserDetails();
        if (response.code === "200") {
          setUser(response.payload);
        }
      } catch (error) {
        setUser(undefined);
      }
      setLoading(false);
    };
    if (!token) return;
    getUserDetails();
  }, [token]);

  const signIn = async (email: string, password: string) => {
    return new Promise<APIResponse>(async (resolve, reject) => {
      try {
        const response = await serviceFactory
          .getAuthService()
          .signIn(email, password);
        if (response.payload?.token) {
          setToken(response.payload?.token);
          localStorage.setItem("token", response.payload?.token);
          env.token = `Bearer ${response.payload?.token}`;
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  const signUp = async (email: string, password: string) => {
    return new Promise<APIResponse>(async (resolve, reject) => {
      try {
        const response = await serviceFactory
          .getAuthService()
          .signUp(email, password);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    env.token = "";
    setUser(null);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth only used under <AuthContext.Provider> wrapped components"
    );
  }

  const { signIn, signOut, signUp, user } = context;

  return {
    user,
    signIn,
    signOut,
    signUp,
  };
};
