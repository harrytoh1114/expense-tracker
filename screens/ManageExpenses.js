import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { ExpensesContext } from "../store/expenses-context";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

const ManageExpenses = ({ navigation, route }) => {
  const expensesCtx = useContext(ExpensesContext);

  const expenseID = route.params?.id;
  const isEditing = !!expenseID;

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(expenseID);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(
        expenseID,
        expensesCtx.addExpense({
          description: "Tesassadt",
          amount: 19.99,
          date: new Date("2022-05-19"),
        })
      );
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2022-05-19"),
      });
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
      <View style={styles.buttonsContainer}>
        <Button style={styles.buttonStyle} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
