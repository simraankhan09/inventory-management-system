import { useQuery } from "@apollo/client";
import { uniqueId } from "lodash";
import { GetCustomerByIdQuery } from "./graphql-query";
import { Spin } from "antd";
import APIError from "../../../error-page/APIError";
import ViewItem, { IViewItem } from "../../../components/ViewItem";
import { useMemo } from "react";

const ViewCustomer = ({
  customerId,
}: {
  customerId: number;
  onCancel: () => void;
}) => {
  const { error, loading, data } = useQuery(GetCustomerByIdQuery, {
    variables: {
      id: customerId,
    },
  });

  const viewItemData: IViewItem[] = useMemo(() => {
    if (!data?.customer) return [];
    const {
      first_name,
      last_name,
      customer_ref_code,
      telephone_no,
      date_of_birth,
      commonAddress,
      identification,
    } = data.customer;
    return [
      {
        key: uniqueId(),
        label: "First Name",
        value: first_name,
      },
      {
        key: uniqueId(),
        label: "Last Name",
        value: last_name,
      },
      {
        key: uniqueId(),
        label: "Customer Reference Code",
        value: customer_ref_code,
        copyToClipboard: true,
      },
      {
        key: uniqueId(),
        label: "Address",
        value: `${commonAddress.building_no}, ${commonAddress.street}, ${commonAddress.city}, ${commonAddress.postal_code}.`,
      },
      {
        key: uniqueId(),
        label: "Identification",
        value: `${identification.identification_no}(${identification.identificationType.name})`,
      },
      {
        key: uniqueId(),
        label: "Telephone",
        value: telephone_no,
        copyToClipboard: true,
      },
      {
        key: uniqueId(),
        label: "Date of birth",
        value: Number(date_of_birth),
        type: "DATE",
      },
    ];
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <APIError error={error} />;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <ViewItem data={viewItemData} />
    </div>
  );
};

export default ViewCustomer;
