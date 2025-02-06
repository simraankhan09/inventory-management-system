import { Button, Input, Select, Table, TableProps } from "antd";
import { useState } from "react";

export interface SearchParams {
  label: string;
  key: string;
}

interface DataSearchTableProps<T> extends TableProps<T> {
  tableSearchParams: SearchParams[];
  placeHolder?: string;
  onFilter: (params: { searchKey: string; searchTerm: string }) => void;
  reset?: boolean;
}

const { Option } = Select;
const DataSearchTable = <T extends object>(props: DataSearchTableProps<T>) => {
  const { tableSearchParams, placeHolder = "Search", onFilter, reset } = props;

  const [params, setParams] = useState<{
    searchKey: string;
    searchTerm: string;
  }>({ searchKey: tableSearchParams[0].key, searchTerm: "" });

  return (
    <>
      <div className="flex gap-x-3 mb-3 w-full">
        <Select
          defaultValue={tableSearchParams[0].key}
          className="w-[250px]"
          onChange={(value) => {
            setParams((prev) => ({ ...prev, searchKey: value }));
          }}
          value={params.searchKey}
        >
          {tableSearchParams.map((param) => (
            <Option key={param.key} value={param.key}>
              {param.label}
            </Option>
          ))}
        </Select>
        <Input
          value={params.searchTerm}
          name="searchTerm"
          placeholder={placeHolder}
          className="!w-[300px]"
          onChange={(e) => {
            setParams((prev) => ({ ...prev, searchTerm: e.target.value }));
          }}
        />
        <Button
          type="primary"
          size="middle"
          htmlType="button"
          onClick={() => onFilter(params)}
        >
          Search
        </Button>
        {reset ? (
          <Button
            type="default"
            size="middle"
            htmlType="button"
            onClick={() => {
              setParams({
                searchKey: tableSearchParams[0].key,
                searchTerm: "",
              });
              onFilter({ searchKey: "", searchTerm: "" });
            }}
          >
            Reset
          </Button>
        ) : null}
      </div>
      <Table {...props} />
    </>
  );
};

export default DataSearchTable;
