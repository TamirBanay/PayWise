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
  static createVoucher(voucherData) {
    return $axios
      .post("vouchers/", voucherData)
      .then((response) => response.data);
  }
}

const service = {
  createVoucher,
};

export default service;
