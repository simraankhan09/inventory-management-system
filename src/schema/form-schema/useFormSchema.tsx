import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { FormFieldType, FormItemSchema } from "./interface";
import RemoteSelect from "../../components/RemoteSelect";

const { Option } = Select;

const renderField = (field: FormItemSchema) => {
  switch (field.type) {
    case FormFieldType.INPUT:
      return <Input placeholder={field.placeholder} />;
    case FormFieldType.SELECT:
      return (
        <Select placeholder={field.placeholder}>
          {field.selectValues?.map((item) => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
      );
    case FormFieldType.REMOTE_SELECT:
      return (
        <RemoteSelect
          api={field.remoteSelectSpec!.api}
          keyValue={field.remoteSelectSpec!.keyValue}
          labelKey={field.remoteSelectSpec!.labelKey}
          placeholder={field.placeholder}
          form={field!.form}
          name={field.name}
        />
      );
    case FormFieldType.INPUT_NUMBER:
      return (
        <InputNumber placeholder={field.placeholder} className="!w-full" />
      );
    case FormFieldType.DATE_PICKER:
      return (
        <DatePicker
          format={field.dateFormat}
          disabledDate={field.disableDate}
          showNow={field.showToday}
        />
      );
    default:
      return <></>;
  }
};

export const useFormSchema = (fields: FormItemSchema[]) => {
  const schema = fields.map((field) => {
    return (
      <Form.Item
        id={field.name}
        name={field.name}
        label={field.label}
        rules={field.rules}
      >
        {renderField(field)}
      </Form.Item>
    );
  });
  return schema;
};
