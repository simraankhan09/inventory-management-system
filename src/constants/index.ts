import { TablePaginationConfig } from "antd";

export const initPagination: TablePaginationConfig = {
  pageSize: 5,
  current: 1,
  pageSizeOptions: ["5", "10", "20", "50"],
  showSizeChanger: true,
  total: 0,
};
