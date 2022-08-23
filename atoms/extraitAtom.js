// user Atom recoil
//
import { atom } from "recoil";

export const extraitAtom = atom({
  key: "extraitAtom",
  default: {
    nomClient: "",
    codebar: "",
  },
});
