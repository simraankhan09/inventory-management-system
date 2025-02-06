import {
  FormFieldType,
  FormItemSchema,
} from "../../../schema/form-schema/interface";
import { requiredField, requiredSelect } from "../../../utils/form-rules";
import { Button, Form, FormInstance } from "antd";
import { useFormSchema } from "../../../schema/form-schema/useFormSchema";
import { dateFormat } from "../../../utils/date-formats";
import moment from "moment";
import { ServiceFactory } from "../../../service/service-factory";
import { env } from "../../../service/config";
import { OnError, OnSuccess } from "../../../components/Notifications";
import { getApiErrorMessage } from "../../../utils/api-error-message";
import { CreateCustomerResource } from "../../../service/customer-service/interface";
import React from "react";

interface CustomerFormProps {
  form: FormInstance;
  onCancel: () => void;
  setReFetchTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const CustomerForm = (props: CustomerFormProps) => {
  const { form, onCancel, setReFetchTrigger } = props;

  const fields: FormItemSchema[] = [
    {
      type: FormFieldType.INPUT,
      label: "First Name",
      name: "firstName",
      rules: [requiredField("First Name")],
    },
    {
      type: FormFieldType.INPUT,
      label: "Last Name",
      name: "lastName",
      rules: [requiredField("Last Name")],
    },
    {
      type: FormFieldType.INPUT,
      label: "Building Number",
      name: "buildingNo",
      rules: [requiredField("Building Number")],
    },
    {
      type: FormFieldType.INPUT,
      label: "Street Name",
      name: "street",
      rules: [requiredField("Street Name")],
    },
    {
      type: FormFieldType.INPUT,
      label: "City",
      name: "city",
      rules: [requiredField("City")],
    },
    {
      type: FormFieldType.INPUT_NUMBER,
      label: "Postal Code",
      name: "postalCode",
      rules: [requiredField("Postal Code")],
    },
    {
      type: FormFieldType.REMOTE_SELECT,
      label: "Identification Type",
      name: "identificationTypeId",
      form,
      remoteSelectSpec: {
        api: (env) => {
          return ServiceFactory.getInstance(env)
            .getIdentificationTypeService()
            .getAllIdentificationTypes();
        },
        keyValue: "id",
        labelKey: "name",
      },
      rules: [requiredSelect()],
    },
    {
      type: FormFieldType.INPUT,
      label: "Identification Number",
      name: "identificationNo",
      rules: [requiredField("Identification Number")],
    },
    {
      type: FormFieldType.INPUT,
      label: "Telephone Number",
      name: "telephone",
    },
    {
      type: FormFieldType.DATE_PICKER,
      label: "Date of birth",
      name: "dateOfBirth",
      dateFormat,
      disableDate: (current) => {
        return current && current > moment();
      },
      showToday: false,
    },
  ];

  const schema = useFormSchema(fields);
  return (
    <Form layout="vertical" form={form}>
      <div className="grid grid-cols-3 gap-3">{schema}</div>
      <div className="flex items-center justify-end gap-x-3">
        <Button danger type="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => form.resetFields()}>Reset</Button>
        <Button
          type="primary"
          onClick={async () => {
            try {
              await form.validateFields();
            } catch (error) {
              return;
            }
            try {
              const formValues = form.getFieldsValue();
              const payload: CreateCustomerResource = {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                address: {
                  buildingNo: formValues.buildingNo,
                  city: formValues.city,
                  postalCode: formValues.postalCode,
                  street: formValues.street,
                },
                identificationNo: formValues.identificationNo,
                identificationTypeId: formValues.identificationTypeId,
                dateOfBirth: formValues?.dateOfBirth,
                telephone: formValues?.telephone,
              };
              const response = await ServiceFactory.getInstance(env)
                .getCustomerService()
                .createCustomer(payload);
              if (response.code === "201") {
                OnSuccess("Success", response.message);
                form.resetFields();
                setReFetchTrigger((prev) => prev + 1);
                onCancel();
              }
            } catch (error) {
              OnError(
                "Customer Create Error",
                getApiErrorMessage(error as any)
              );
            }
          }}
        >
          Create
        </Button>
      </div>
    </Form>
  );
};

export default CustomerForm;
