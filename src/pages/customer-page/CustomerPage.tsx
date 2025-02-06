import MainTemplate from "../../templates/MainTemplate";
import { Button, Modal } from "antd";
import DataSearchTable from "../../components/DataSearchTable/DataSearchTable";
import { tableSearchParams, useCustomer } from "./useCustomer";
import { Customer } from "../../types";
import CustomerForm from "./components/CustomerForm";
import ViewCustomer from "./components/ViewCustomer";

const CustomerPage = () => {
  const {
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
  } = useCustomer();
  return (
    <MainTemplate>
      <div className="w-full flex items-center justify-end mb-5">
        <Button
          type="primary"
          size="middle"
          onClick={() => {
            onVisibleCustomerForm();
          }}
        >
          Create
        </Button>
      </div>
      <DataSearchTable<Customer>
        tableSearchParams={tableSearchParams}
        columns={columns}
        dataSource={tableData}
        loading={tableLoading}
        onFilter={(params) => {
          setFilterParam(params);
          searchCustomer(
            pagination.pageSize ?? 10,
            pagination.current ?? 1,
            params
          );
        }}
        reset
        pagination={pagination}
        onChange={(paginationConfig) => {
          handlePagination(paginationConfig);
        }}
        bordered
        rowKey={(record) => record.id}
      />
      <Modal
        title="Customer Form"
        open={visibleCustomerForm}
        onCancel={onCancelCustomerForm}
        maskClosable={false}
        closable
        centered
        width="70%"
        footer={[]}
      >
        <CustomerForm
          form={customerForm}
          onCancel={onCancelCustomerForm}
          setReFetchTrigger={setReFetchTrigger}
        />
      </Modal>
      {customerId ? (
        <Modal
          open={!!customerId}
          onCancel={() => {
            setCustomerId(undefined);
          }}
          maskClosable={false}
          closable
          centered
          width="60%"
          footer={[]}
        >
          <ViewCustomer
            onCancel={() => setCustomerId(undefined)}
            customerId={customerId}
          />
        </Modal>
      ) : null}
    </MainTemplate>
  );
};

export default CustomerPage;
