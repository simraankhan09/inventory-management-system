import React from "react";
import { FaHouse, FaUserTie } from "react-icons/fa6";
import { UserRole } from "./types";
import HomePage from "./pages/home-page/HomePage";
import CustomerPage from "./pages/customer-page/CustomerPage";

export interface MenuItem {
  key: string;
  path?: string;
  label: string;
  roles?: UserRole[];
  icon?: React.ReactNode;
  children?: MenuItem[];
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
    key: "customers",
    path: "customers",
    icon: <FaUserTie />,
    roles: ["USER", "ADMIN"],
    component: <CustomerPage />,
  },
];
