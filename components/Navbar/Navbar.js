import { Breadcrumb, Layout, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Logo from "../../assets/images/logo.png";

const { Header, Content, Footer } = Layout;
const Navbar = (props) => {
  const router = useRouter();
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          background: "lightblue",
        }}
      >
        <Image
          src={Logo}
          className="myImage"
          onClick={() => {
            router.push("/dashboard");
          }}
        />
        <Menu
          style={{ background: "lightblue", width: "100%" }}
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={[
            {
              key: "1",
              label: "Bordreau",
              onClick: () => {
                router.push("/dashboard/bordreau");
              },
            },
          ]}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        {/* <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
        <div className="site-layout-content">{props.children}</div>
      </Content>
    </Layout>
  );
};

export default Navbar;
