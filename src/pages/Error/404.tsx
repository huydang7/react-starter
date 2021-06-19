import { Result, Button } from "antd";
import React from "react";
const NotFound: React.FC = (props: any) => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => props.history.push("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
