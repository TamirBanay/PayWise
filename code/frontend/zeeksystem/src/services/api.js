import Axios from "axios";

const $axios = Axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Example of a cross-cutting concern - client api error-handling
$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("got error");
    console.error(error);

    throw error;
  }
);

class getVoucherService {
  static getVoucher(voucherID, walletID) {
    return $axios
      .get(`get_Vouchers/${int}/${int}`)
      .then((response) => response.data);
  }
}

const service = {
  getVoucher,
};

export default service;
