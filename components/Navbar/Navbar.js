import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Logo from "../../assets/images/logo.png";

const { Header, Content } = Layout;
const Navbar = (props) => {
  const router = useRouter();
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          background: "white",
          border: "1px solid lightgrey",
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
          style={{ background: "white", width: "100%" }}
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={[
            {
              key: "1",
              label: "Bordreau",
              style: { fontWeight: "bold" },
              onClick: () => {
                router.push("/dashboard/bordreau");
              },
            },
            {
              key: "2",
              label: "Livreur",
              style: { fontWeight: "bold" },
              onClick: () => {
                router.push("/admin/livreur");
              },
            },
          ]}
        />
        <Button
          type="default"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
        >
          {" "}
          Logout
        </Button>
      </Header>
      <Content
        style={{
          padding: "0 50px",
          background: "white",
        }}
      >
        <div className="site-layout-content">{props.children}</div>
      </Content>
    </Layout>
  );
};

export default Navbar;
