import React from "react";
import { StyleSheet, Dimensions, View, Button, Text } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { FieldModel, ROW_SIZE } from "../../models";
import { getCellByCoords } from "../../utils";
import Cell from "../Cell/Cell";

const window = Dimensions.get("window");

const gestureRecognizerConfig = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 80,
};

export interface GameFieldProps {
  field: FieldModel;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
}

const GameField: React.FC<GameFieldProps> = ({
  field,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onSwipeDown,
}) => {
  const rows: React.ReactNode[] = [];
  for (let i = 0; i < ROW_SIZE; ++i) {
    const cells: React.ReactNode[] = [];
    for (let j = 0; j < ROW_SIZE; ++j) {
      cells.push(
        <Cell key={`cell.${j}.${i}`} value={getCellByCoords(field, j, i)} />
      );
    }
    rows.push(
      <View key={`row${rows.length}`} style={styles.row}>
        {cells}
      </View>
    );
  }

  // TODO: draft design
  const handleSwipeRight = () => {
    onSwipeRight();
  };

  const handleSwipeLeft = () => {
    onSwipeLeft();
  };

  const handleSwipeUp = () => {
    onSwipeUp();
  };

  const handleSwipeDown = () => {
    onSwipeDown();
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        height: "100%",
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center",
        //aspectRatio: 1,
      }}
    >
      <GestureRecognizer
        config={gestureRecognizerConfig}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
        style={{
          flexDirection: "row",
          //backgroundColor: "red",
          //flex: 1,
          //width: window.width - 20,
          //height: window.width - 20,
          //alignSelf: "center",
          //aspectRatio: 1,
        }}
      >
        <View style={styles.field}>{rows}</View>
      </GestureRecognizer>
      {/* <View style={styles.field}>{rows}</View> */}
      <View style={styles.debugControls}>
        <Button title="swipe right" onPress={handleSwipeRight} />
        <Button title="swipe left" onPress={handleSwipeLeft} />
        <Button title="swipe up" onPress={handleSwipeUp} />
        <Button title="swipe down" onPress={handleSwipeDown} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    //flex: 1,
    width: window.width - 20,
    height: window.width - 20,
    backgroundColor: "#837a70",
    //aspectRatio: 1,
    //height: "auto",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    //justifyContent: "space-between",
    //alignSelf: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  debugControls: {
    flex: 1,
  },
});

export default GameField;
