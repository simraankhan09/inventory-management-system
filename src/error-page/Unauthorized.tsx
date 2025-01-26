import { Button } from "antd";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[300px] text-center">
        <h1 className="font-extrabold capitalize my-5">
          403 UnAuthorzied to Access the Page
        </h1>
        <Button type="primary">
          <Link to="/home">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
