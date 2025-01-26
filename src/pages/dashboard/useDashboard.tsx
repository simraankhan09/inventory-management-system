import { useState } from "react";
import { navigation } from "../../navigation";

export const useDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [componentkey, setComponentKey] = useState(navigation[0].key);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return {
    collapsed,
    componentkey,
    setComponentKey,
    toggleCollapse,
  };
};
