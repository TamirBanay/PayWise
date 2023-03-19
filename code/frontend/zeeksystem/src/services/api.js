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

//class charInStringService {
    // static getCharInString(id) {
    //   return $axios
    //     .get(`charInString/get-charInString/${id}`)
    //     .then((response) => response.data);
    // }
  //  static example(expmale1, expmale2) {
    //  return $axios
      //  .get(`charInString/data_from_client/${expmale1}/${expmale2}`)
       // .then((response) => response.data);
    //}









const service = {

  };
  
  export default service;
  