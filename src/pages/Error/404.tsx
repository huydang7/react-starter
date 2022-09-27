import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = (props: any) => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Result
        status="404"
        title="404"
        subTitle="Rất tiếc, trang bạn truy cập không tồn tại."
        extra={
          <Button type="primary">
            <Link to="/">Quay về trang chủ</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
