import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import React from "react";
import Logo from "../../assets/images/logo.png";

const { Header, Content } = Layout;
const Navbar = (props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const expediteurRoute = [
    {
      key: "1",
      label: "Bordreau",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/dashboard/bordereau");
      }
    },
    {
      key: "2",
      label: "Détail",
      style: {
        fontWeight: "bold"
      },
      onClick: () => {
        router.push("/dashboard/informations");
      }
    }
  ];
  const adminRoute = [
    {
      key: "1",
      label: "Dashboard",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/admin");
      }
    },
    {
      key: "2",
      label: "Bordereau",
      style: {
        fontWeight: "bold"
      },
      onClick: () => {
        router.push("/admin/expediteur");
      }
    },
    {
      key: "3",
      label: "Livreur",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/admin/livreur");
      }
    },
    {
      key: "4",
      label: "Colis",
      style: { fontWeight: "bold" },
      onClick: () => {
        router.push("/admin/colis");
      }
    }
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
          border: "1px solid lightgrey"
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
          items={user && user.role === "admin" ? adminRoute : expediteurRoute}
        />
        <Button
          type="default"
          onClick={() => {
            localStorage.removeItem("token");
            setUser({});
            location.href.replace(location.hostname);
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
          background: "white"
        }}
      >
        <div className="site-layout-content">{props.children}</div>
      </Content>
    </Layout>
  );
};

export default Navbar;
