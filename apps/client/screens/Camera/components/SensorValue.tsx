import Theme from "Shared/theme";
import { ReactNode, cloneElement } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export function SensorValue({
  value,
  isPending,
  isError,
  icon,
}: {
  value: string;
  isPending: boolean;
  isError: boolean;
  icon: ReactNode;
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      {cloneElement(icon as React.ReactElement, {
        color: Theme.color.button.neutral,
        size: 20,
      })}

      <SensorContent value={value} isPending={isPending} isError={isError} />
    </View>
  );
}
const SensorContent = ({ value, isPending, isError }) => {
  if (isPending)
    return (
      <ActivityIndicator size="small" color={Theme.color.button.neutral} />
    );

  if (isError) {
    return <Text style={{ color: Theme.color.button.neutral }}>N/A</Text>;
  }

  return <Text style={{ color: Theme.color.button.neutral }}>{value}</Text>;
};
