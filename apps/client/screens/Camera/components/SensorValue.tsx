import { Label } from "Components/Typography";
import Theme from "Shared/theme";
import { ReactNode, cloneElement } from "react";
import { ActivityIndicator, View } from "react-native";

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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
    return <Label customStyle={{ fontSize: 13 }}>N/A</Label>;
  }

  return <Label customStyle={{ fontSize: 13 }}>{value}</Label>;
};
