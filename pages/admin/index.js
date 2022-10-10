import React from "react";
import Bar from "../../components/Bar";
import LineColis from "../../components/LineColis";
import LivreurBar from "../../components/LiveurBar";
import Navbar from "../../components/Navbar/Navbar";

export default function DashboardAdmin() {
  return (
    <Navbar>
      <Bar />
      <LineColis />
      <LivreurBar />
    </Navbar>
  );
}
