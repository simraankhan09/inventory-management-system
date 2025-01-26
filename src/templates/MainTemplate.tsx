import { PropsWithChildren } from "react";

interface MainTemplateProps extends PropsWithChildren {
  className?: string;
}

const MainTemplate = ({ children, className }: MainTemplateProps) => {
  return (
    <div className={`w-full h-full p-2 ${className ?? ""}`}>{children}</div>
  );
};

export default MainTemplate;
