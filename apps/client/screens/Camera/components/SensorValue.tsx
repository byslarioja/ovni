import { Label } from "Components/Typography";
import Theme from "Shared/theme";
import { cloneElement, ReactNode, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

export function SensorValue<T>(props: SensorValueProps<T>) {
  const iconElement = useMemo(
    () =>
      cloneElement(props.icon as React.ReactElement, {
        color: Theme.color.button.neutral,
        size: 20,
      }),
    [props.icon]
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {iconElement}
      <SensorContent {...props} />
    </View>
  );
}

function SensorContent<T>(props: SensorContentProps<T>) {
  const { value, isPending, isError, format } = props;

  if (isPending)
    return (
      <ActivityIndicator size="small" color={Theme.color.button.neutral} />
    );

  if (isError || !value) {
    return <Label customStyle={{ fontSize: 13 }}>N/A</Label>;
  }

  return <Label customStyle={{ fontSize: 13 }}>{format(value)}</Label>;
}

type SensorValueProps<T> = {
  value: T;
  isPending: boolean;
  isError: boolean;
  format: (value: T) => string;
  icon: ReactNode;
};

type SensorContentProps<T> = Omit<SensorValueProps<T>, "icon">;
