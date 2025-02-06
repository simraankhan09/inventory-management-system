import { Rule } from "antd/es/form";

export const requiredField = (fieldName: string): Rule => {
  return {
    message: `${fieldName} is required`,
    required: true,
  };
};

export const requiredSelect = (): Rule => {
  return {
    message: `Please select a value`,
    required: true,
  };
};
