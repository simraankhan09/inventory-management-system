import React from "react";
import { FaHouse, FaUserTie } from "react-icons/fa6";
import { UserRole } from "./types";
import HomePage from "./pages/home-page/HomePage";
import CustomerPage from "./pages/customer-page/CustomerPage";
import CustomerCreate from "./pages/customer-page/CustomerCreate";

export interface MenuItem {
  key: string;
  path?: string;
  label: string;
  roles?: UserRole[];
  icon?: React.ReactNode;
  component: React.ReactNode;
}

export const navigation: MenuItem[] = [
  {
    label: "Home",
    key: "/home/dashboard",
    path: "/home/dashboard",
    icon: <FaHouse />,
    roles: ["USER", "ADMIN"],
    component: <HomePage />,
  },
  {
    label: "Customers",
    key: "/home/customers",
    path: "/home/customers",
    icon: <FaUserTie />,
    roles: ["ADMIN", "USER"],
    component: <CustomerPage />,
  },
];

export const routes: {
  id: string;
  key: string;
  path: string;
  element: React.ReactNode;
  roles?: string[];
}[] = [];
