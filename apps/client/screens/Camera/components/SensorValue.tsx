import { Label } from "Components/Typography";
import Theme from "Shared/theme";
import {
  ClimatePrimitive,
  GPSPrimitive,
  RotationPrimitive,
} from "globals/sensor.primitives";
import { cloneElement, memo, ReactNode, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

export const SensorValue = memo((props: SensorValueProps) => {
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
});

const SensorContent = (props: SensorContentProps) => {
  const { value, isPending, isError, format } = props;

  if (isPending)
    return (
      <ActivityIndicator size="small" color={Theme.color.button.neutral} />
    );

  if (isError || !value) {
    return <Label customStyle={{ fontSize: 13 }}>N/A</Label>;
  }

  return <Label customStyle={{ fontSize: 13 }}>{format(value)}</Label>;
};

type SensorValueProps = {
  value: ValuePrimitive;
  isPending: boolean;
  isError: boolean;
  format: (value: ValuePrimitive) => string;
  icon: ReactNode;
};

type ValuePrimitive =
  | GPSPrimitive
  | ClimatePrimitive
  | string
  | RotationPrimitive;

type SensorContentProps = Omit<SensorValueProps, "icon">;
