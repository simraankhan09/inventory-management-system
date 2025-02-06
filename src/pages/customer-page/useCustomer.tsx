import { TablePaginationConfig, TableProps } from "antd/es/table";
import { SearchParams } from "../../components/DataSearchTable/DataSearchTable";
import { Customer } from "../../types";
import moment from "moment";
import { dateFormat } from "../../utils/date-formats";
import { useCallback, useEffect, useRef, useState } from "react";
import { initPagination } from "../../constants";
import { ServiceFactory } from "../../service/service-factory";
import { env } from "../../service/config";
import { Button, Form } from "antd";

export const tableSearchParams: SearchParams[] = [
  {
    label: "First Name",
    key: "first_name",
  },
  {
    label: "Last Name",
    key: "last_name",
  },
  {
    label: "Customer Reference Code",
    key: "customer_ref_code",
  },
];

export const useCustomer = () => {
  const serviceFactory = ServiceFactory.getInstance(env);

  const [customerForm] = Form.useForm();

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(initPagination);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<Customer[]>([]);
  const [filterParam, setFilterParam] = useState<{
    searchKey: string;
    searchTerm: string;
  }>();
  const [visibleCustomerForm, setVisibleCustomerForm] = useState(false);
  const [reFetchTrigger, setReFetchTrigger] = useState(0);
  const [customerId, setCustomerId] = useState<number>();
  const initFetchRef = useRef<boolean>(false);

  const columns: TableProps<Customer>["columns"] = [
    {
      dataIndex: "first_name",
      title: "First Name",
      key: "first_name",
    },
    {
      dataIndex: "last_name",
      title: "Last Name",
      key: "last_name",
    },
    {
      dataIndex: "customer_ref_code",
      title: "Customer Reference Code",
      key: "customer_ref_code",
    },
    {
      dataIndex: "telephone_no",
      title: "Telephone Number",
      key: "telephone_no",
      render(value) {
        return value ?? "-";
      },
    },
    {
      dataIndex: "date_of_birth",
      title: "Date of birth",
      key: "date_of_birth",
      render(value) {
        return value ? moment(value).format(dateFormat) : "-";
      },
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: "Actions",
      render(value, record, index) {
        return (
          <Button
            type="link"
            onClick={() => {
              setCustomerId(record.id);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  const searchCustomer = useCallback(
    async (
      pageSize: number,
      pageNumber: number,
      param?: { searchKey: string; searchTerm: string }
    ) => {
      setTableLoading(true);
      try {
        const response = await serviceFactory
          .getCustomerService()
          .searchCustomer({
            pageNumber: pageNumber - 1,
            pageSize,
            params: {
              searchKey: param?.searchKey ?? "",
              searchTerm: param?.searchTerm ?? "",
            },
          });
        setTableData(response.content);
        setPagination((prev) => ({
          ...prev,
          total: response.total,
          current: response.current + 1,
          pageSize: response.size,
        }));
      } catch (error) {
        setTableData([]);
        console.error(error);
      }
      setTableLoading(false);
    },
    []
  );

  useEffect(() => {
    if (initFetchRef.current) return;
    searchCustomer(pagination.pageSize ?? 10, pagination.current ?? 1);
    initFetchRef.current = true;
  }, []);

  useEffect(() => {
    if (!filterParam?.searchTerm) {
      setPagination(initPagination);
    }
  }, [filterParam]);

  useEffect(() => {
    if (!reFetchTrigger) return;
    searchCustomer(pagination.pageSize ?? 10, pagination.current ?? 1);
  }, [reFetchTrigger]);

  const handlePagination = async (newPagination: TablePaginationConfig) => {
    await searchCustomer(
      newPagination.pageSize ?? 10,
      newPagination.current ?? 1,
      filterParam
    );
  };

  const onCancelCustomerForm = () => {
    setVisibleCustomerForm(false);
  };

  const onVisibleCustomerForm = () => {
    setVisibleCustomerForm(true);
  };

  return {
    pagination,
    tableData,
    tableLoading,
    visibleCustomerForm,
    customerForm,
    customerId,
    columns,
    setFilterParam,
    searchCustomer,
    handlePagination,
    onCancelCustomerForm,
    onVisibleCustomerForm,
    setReFetchTrigger,
    setCustomerId,
  };
};
