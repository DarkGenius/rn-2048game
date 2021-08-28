import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { CellValue } from "../../models";

const window = Dimensions.get("window");
const cellWidth = (window.width - 60) / 4;
console.log(cellWidth);

export interface CellProps {
  value: CellValue;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    //flex: 1,
    width: cellWidth,
    height: cellWidth,
    backgroundColor: "#958c83",
    //margin: 10,
    //borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "600",
    fontFamily: "monospace",
    color: "white",
  },
});

export default Cell;
