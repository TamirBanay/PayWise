import { atom } from "recoil";

export const _Vouchers = atom({
  key: "_Vouchers",
  default: [],
});
export const _User = atom({
  key: "_User",
  default: "",
});
export const first_name = atom({
  key: "firstName",
  default: "",
});
export const last_name = atom({
  key: "lastName",
  default: "",
});
export const user_email = atom({
  key: "userEmail",
  default: "",
});
export const _Redirect = atom({
  key: "Redirect",
  default: true,
});

    