import { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { useDebugValue } from "react";
import { fetchExpenses } from "../util/http";
import { useState } from "react";

const RecentExpenses = ({ navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      const expense = await fetchExpenses();
      expensesCtx.setExpenses(expense)
      // setFetchedExpenses(expense);
    };

    getExpenses();
  }, [fetchExpenses]);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    navigation.setOptions({
      title: "All Expenses",
    });
  }, []);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses for the past 7 days"
    />
  );
};

export default RecentExpenses;
