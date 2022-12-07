import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-389a7-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const storeExpenses = (expenseData) => {
  axios.post(BACKEND_URL + "expenses.json", expenseData);
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
