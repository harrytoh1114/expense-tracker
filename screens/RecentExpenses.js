import { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = ({ navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  useEffect(() => {
    navigation.setOptions({
      title: "All Expenses",
    });
  }, []);

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />;
};

export default RecentExpenses;
