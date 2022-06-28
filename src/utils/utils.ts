import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://opentdb.com",
});

const amount = "api.php?amount=5";
const services = {
  fetchTriviaData: async (url: string) => {
    return await axiosInstance
      .get(amount + url)
      .then((response: AxiosResponse) => {
        return response.data;
      });
  },

  fetchCategories: async () => {
    return await axiosInstance
      .get("api_category.php")
      .then((response: AxiosResponse) => {
        return response.data;
      });
  },
};

export default services;
