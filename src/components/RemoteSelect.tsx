import { FormInstance, Select } from "antd";
import { useEffect, useState } from "react";
import { EnvConfig } from "../types";
import { env } from "../service/config";

interface RemoteSelectProps {
  api: (env: EnvConfig) => Promise<any[]>;
  labelKey: string;
  keyValue: string;
  placeholder?: string;
  name: string;
  form: FormInstance;
}

const RemoteSelect = (props: RemoteSelectProps) => {
  const { api, labelKey, keyValue, placeholder, form, name } = props;

  const [data, setData] = useState<{ label: string; key: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await api(env);
        setData(
          response.map((item: any) => {
            return {
              label: item[labelKey],
              key: item[keyValue],
            };
          })
        );
      } catch (error) {
        console.error(error);
        setData([]);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <Select
      loading={loading}
      placeholder={placeholder}
      onChange={(value) => {
        form.setFieldsValue({
          ...form.getFieldsValue(),
          [name]: value,
        });
      }}
    >
      {data.map((item) => (
        <Select.Option key={item.key} value={item.key}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default RemoteSelect;
