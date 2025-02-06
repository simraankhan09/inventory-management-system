import moment from "moment";
import { dateFormat } from "../utils/date-formats";
import { Button } from "antd";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { useState } from "react";

export interface IViewItem {
  key: string;
  label: string;
  value: any;
  type?: ViewItemType;
  copyToClipboard?: boolean;
}

export type ViewItemType = "DATE" | "AMOUNT";

interface ViewItemProps {
  data: IViewItem[];
}

const ViewItem = (props: ViewItemProps) => {
  const { data } = props;
  const [isCopied, setIsCopied] = useState(false);
  const [triggerCopy, setTrigerCopy] = useState(false);

  const getItemValue = (value: any, type?: ViewItemType) => {
    if (!value) return "-";

    if (!type) return value;

    switch (type) {
      case "DATE":
        return moment(value).format(dateFormat);
      case "AMOUNT":
        return Number(value).toFixed(2);
      default:
        return "-";
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data.map(({ key, label, value, type, copyToClipboard }) => (
        <div key={key} className="p-2 m-2 flex flex-col">
          <>
            <span className="text-xstext-gray-500">{label}</span>
            <span
              className="font-semibold text-[14px] transition-all"
              onMouseEnter={() => {
                if (!copyToClipboard) return;
                setTrigerCopy(true);
              }}
              onMouseLeave={() => {
                if (!copyToClipboard) return;
                setTrigerCopy(false);
              }}
            >
              {getItemValue(value, type)}
              {copyToClipboard && triggerCopy ? (
                <Button
                  size="small"
                  type="link"
                  icon={isCopied ? <FaCheck /> : <FaRegCopy />}
                  className="ml-1 transition-all"
                  onClick={() => handleCopyToClipboard(value)}
                />
              ) : (
                ""
              )}
            </span>
          </>
        </div>
      ))}
    </>
  );
};

export default ViewItem;
