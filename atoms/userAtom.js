// user Atom recoil
//
import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    id: null,
    role: "expediteur",
  },
});
