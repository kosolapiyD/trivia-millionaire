import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  // https://opentdb.com/api.php?amount=10&category=25&difficulty=easy
  // https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple
  // https://opentdb.com/api.php?amount=10
  // api_category.php
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
