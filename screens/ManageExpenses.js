import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { ExpensesContext } from "../store/expenses-context";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpenses, updateExpense, deleteExpense } from "../util/http";

const ManageExpenses = ({ navigation, route }) => {
  const expensesCtx = useContext(ExpensesContext);

  const expenseID = route.params?.id;
  const isEditing = !!expenseID;

  const selectedExpenses = expensesCtx.expenses.find(
    (expense) => expense.id === expenseID
  );

  const deleteExpenseHandler = async () => {
    await deleteExpense(expenseID);
    expensesCtx.deleteExpense(expenseID);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(expenseID, {
        ...expenseData,
      });
      await updateExpense(expenseID, expenseData);
    } else {
      const id = await storeExpenses(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }

    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        submiteButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpenses}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
