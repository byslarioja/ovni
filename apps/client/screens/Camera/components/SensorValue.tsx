import { Label } from "Components/Typography";
import Theme from "Shared/theme";
import { cloneElement, memo, ReactNode, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

export const SensorValue = memo((props: SensorValueProps) => {
  const { value, isPending, isError, icon } = props;

  const iconElement = useMemo(
    () =>
      cloneElement(icon as React.ReactElement, {
        color: Theme.color.button.neutral,
        size: 20,
      }),
    [icon]
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {iconElement}
      <SensorContent value={value} isPending={isPending} isError={isError} />
    </View>
  );
});

const SensorContent = memo((props: SensorContentProps) => {
  const { value, isPending, isError } = props;

  if (isPending)
    return (
      <ActivityIndicator size="small" color={Theme.color.button.neutral} />
    );

  if (isError) {
    return <Label customStyle={{ fontSize: 13 }}>N/A</Label>;
  }

  return <Label customStyle={{ fontSize: 13 }}>{value}</Label>;
});

type SensorValueProps = {
  value: string;
  isPending: boolean;
  isError: boolean;
  icon: ReactNode;
};

type SensorContentProps = Pick<
  SensorValueProps,
  "value" | "isPending" | "isError"
>;
