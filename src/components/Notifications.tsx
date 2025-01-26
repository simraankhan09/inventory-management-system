import { notification } from "antd";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";

export const OnSuccess = (message: string, description: string) => {
  notification.success({
    message,
    description,
    icon: <FaRegCircleCheck className="text-green-600" />,
  });
};

export const OnError = (message: string, description: string) => {
  notification.error({
    message,
    description,
    icon: <FaCircleExclamation className="text-red-600" />,
    duration: 3000,
  });
};
