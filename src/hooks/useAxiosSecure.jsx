import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://genius-cars-doctor-crud-server-v2.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log("error tracked in the interceptor", error.response);
        // return Promise.reject(error);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("log out the user");
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => console.log(err));
        }
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
