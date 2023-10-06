import React from 'react';
import { Space, Typography } from 'antd';

const TitleWithAction = (props: { title: string; action?: React.ReactNode }) => {
  return (
    <div className="flex justify-between">
      <Typography.Title level={3}>{props.title}</Typography.Title>
      <Space>{props?.action}</Space>
    </div>
  );
};

export default TitleWithAction;
