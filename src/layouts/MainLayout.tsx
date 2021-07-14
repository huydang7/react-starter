import { Layout } from "antd";
const { Header, Content } = Layout;

const MainLayout: React.FC = (props) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content> {props.children}</Content>
    </Layout>
  );
};

export default MainLayout;
