import { useAuth } from "../../context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import {
  FaBars,
  FaCircleUser,
  FaPowerOff,
  FaRegAddressCard,
  FaRegUser,
} from "react-icons/fa6";
import { useDashboard } from "./useDashboard";
import { User } from "../../types";
import { navigation } from "../../navigation";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";

const Status = ({ user }: { user: User | null | undefined }) => {
  return (
    <div className="flex items-center" title={user?.status}>
      <span className="mr-2">{user?.email}</span>
      <span
        className={`w-[10px] h-[10px] rounded-full ${
          user?.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
        }`}
      />
    </div>
  );
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { collapsed, componentkey, toggleCollapse, setComponentKey } =
    useDashboard();
  const navigate = useNavigate();
  const navItem = navigation.find((nav) => nav.key === componentkey);
  return (
    <>
      <div className="w-full bg-blue-500 px-2 py-2 h-[48px] flex items-center justify-between">
        <Button
          className="text-white"
          type="primary"
          icon={<FaBars className="text-white w-[25px] h-[25px]" />}
          onClick={toggleCollapse}
        />
        <Dropdown
          arrow={true}
          className="cursor-pointer text-white w-[25px] h-[25px]"
          trigger={["click"]}
          menu={{
            items: [
              {
                label: <Status user={user} />,
                key: "EMAIL",
                icon: <FaRegAddressCard />,
              },
              {
                label: `${user?.role}`,
                key: "ROLE",
                icon: <FaRegUser />,
              },
              {
                label: "Sign Out",
                key: "SIGNOUT",
                icon: <FaPowerOff />,
              },
            ],
            onClick: (info) => {
              if (info.key === "SIGNOUT") {
                signOut();
              }
            },
          }}
        >
          <FaCircleUser />
        </Dropdown>
      </div>
      <div className="w-full flex" style={{ height: "calc(100vh - 48px)" }}>
        <div className="w-[256px] max-h-full">
          <Menu
            className="!bg-blue-300 h-full"
            mode="inline"
            inlineCollapsed={collapsed}
            items={navigation}
            onClick={(info) => {
              navigate(info.key);
              setComponentKey(info.key);
            }}
          />
        </div>
        {navItem ? (
          <ProtectedRoute accessibleRoles={navItem.roles}>
            {navItem.component}
          </ProtectedRoute>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
