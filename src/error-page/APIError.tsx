import { ApolloError } from "@apollo/client";
import { Button } from "antd";
import { Link } from "react-router-dom";

const APIError = ({
  error,
  back,
}: {
  error?: ApolloError;
  back?: { backTo: string };
}) => {
  return (
    <div className="text-center">
      <h3 className="font-semibold text-red-500 mb-3">
        {error?.message ?? "Something went wrong!"}
      </h3>
      {back ? (
        <Button type="primary" danger>
          <Link to={back.backTo}>Back</Link>
        </Button>
      ) : null}
    </div>
  );
};

export default APIError;
