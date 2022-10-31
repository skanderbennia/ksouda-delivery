import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import Navbar from "../../components/Navbar/Navbar";

export default function Dashboard() {
  const user = useRecoilValue(userAtom);
  return <Navbar>dashboard</Navbar>;
}
