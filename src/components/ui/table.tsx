import { Table as AntTable, TableProps } from 'antd';

const Table = (props: TableProps<any>) => {
  return <AntTable scroll={{ x: true }} {...props} />;
};

export default Table;
