import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[300px] text-center">
        <h1 className="font-extrabold capitalize my-5">404 Page Not Found</h1>
        <Button type="primary">
          <Link to="/home">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
