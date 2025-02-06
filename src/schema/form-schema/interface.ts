import { FormInstance, Rule } from "antd/es/form";
import { DatePicker, GetProps } from "antd";
import { EnvConfig } from "../../types";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export interface FormItemSchema {
  type: FormFieldType;
  name: string;
  label: string;
  rules?: Rule[];
  selectValues?: { label: string; value: string }[];
  remoteSelectSpec?: {
    api: (env: EnvConfig) => Promise<any[]>;
    labelKey: string;
    keyValue: string;
  };
  placeholder?: string;
  dateFormat?: string;
  disableDate?: RangePickerProps["disabledDate"];
  showToday?: boolean;
  form?: FormInstance;
}

export enum FormFieldType {
  INPUT = "INPUT",
  SELECT = "SELECT",
  REMOTE_SELECT = "REMOTE_SELECT",
  SWITCH = "SWITCH",
  INPUT_NUMBER = "INPUT_NUMBER",
  DATE_PICKER = "DATE_PICKER",
}
