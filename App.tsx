import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import GameField from "./components/GameField/GameField";
import { CELLS_COUNT, FieldModel, ShiftDirection } from "./models";
import {
  randCell,
  shiftField,
  getNewField,
  addCell,
  tryMakeMove,
} from "./utils";

export default function App() {
  const [field, setField] = React.useState(getNewField());

  const onSwipeRight = () => {
    console.log("before: ", field.cells);
    const [newCells, newMove] = tryMakeMove(field.cells, ShiftDirection.Right);
    console.log("after: ", newCells);
    if (newMove)
      setField({
        ...field,
        cells: newCells,
      });
  };

  const onSwipeLeft = () => {
    console.log("before: ", field.cells);
    const [newCells, newMove] = tryMakeMove(field.cells, ShiftDirection.Left);
    console.log("after: ", newCells);
    if (newMove)
      setField({
        ...field,
        cells: newCells,
      });
  };

  const onSwipeUp = () => {
    console.log("before: ", field.cells);
    const [newCells, newMove] = tryMakeMove(field.cells, ShiftDirection.Up);
    console.log("after: ", newCells);
    if (newMove)
      setField({
        ...field,
        cells: newCells,
      });
  };

  const onSwipeDown = () => {
    console.log("before: ", field.cells);
    const [newCells, newMove] = tryMakeMove(field.cells, ShiftDirection.Down);
    console.log("after: ", newCells);
    if (newMove)
      setField({
        ...field,
        cells: newCells,
      });
  };

  return (
    <View style={styles.container}>
      <GameField
        field={field}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
        onSwipeDown={onSwipeDown}
        onSwipeUp={onSwipeUp}
      />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
