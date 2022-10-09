import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import React from "react";
import Logo from "../../assets/images/logo.png";

const { Header, Content } = Layout;
const Navbar = (props) => {
  const user = useRecoilValue(userAtom);
  const expediteurRoute = [
    {
      key: "1",
      label: "Bordreau",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/dashboard/bordreau");
      },
    },
  ];
  const adminRoute = [
    {
      key: "1",
      label: "Dashboard",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/dashboard/bordreau");
      },
    },
    {
      key: "2",
      label: "Bordereau",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/dashboard/bordreau");
      },
    },
    {
      key: "3",
      label: "Livreur",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/dashboard/bordreau");
      },
    },
  ];
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
          items={user.role === "admin" ? adminRoute : expediteurRoute}
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
