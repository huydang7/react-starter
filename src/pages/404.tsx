import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFound: React.FC = () => {
  return (
    <div style={{ height: '100%', width: '100%' }} className="flex-center">
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
