import Theme from "Shared/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color.scheme.black[600],
  },
  item: {
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: Theme.color.scheme.black[300],
    opacity: 0.5,
  },
  active: {
    width: 30,
    opacity: 1,
    backgroundColor: Theme.color.scheme.white[500],
  },
  title: {
    color: Theme.color.scheme.white[500],
    fontSize: 24,
  },
  subtitle: {
    color: Theme.color.scheme.black[200],
  },
  actions: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
});
