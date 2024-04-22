import { Button } from "Components/Button";
import { View, useWindowDimensions } from "react-native";
import { styles } from "./styles";
import { Label, Title } from "Components/Typography";
import { Linking } from "react-native";
import { PermissionResponse } from "expo-camera";
import { translate } from "Shared/utils/translate";
import { translation } from "Shared/translation";

const lang = translate(translation);

export function RequestSinglePermission({ item }: RequestPermission) {
  const { width } = useWindowDimensions();

  const description = lang.t(
    `PERMISSIONS.${item.name.toUpperCase()}.DESCRIPTION`
  );

  const shouldOpenAppSettings =
    item.status.canAskAgain &&
    (item.status.status === "undetermined" || item.status.status === "denied");

  const title = lang.t(`PERMISSIONS.${item.name.toUpperCase()}.TITLE`);

  // TODO: Should consider caniaskagain value for this but for somereason is not working
  const buttonText = shouldOpenAppSettings
    ? lang.t(`PERMISSIONS.${item.name.toUpperCase()}.BUTTON`)
    : lang.t(`PERMISSIONS.${item.name.toUpperCase()}.BUTTON`);
  // : lang.t("PERMISSIONS.OPEN_SETTINGS");
  const handlePermission = shouldOpenAppSettings ? item.request : item.request;
  // : Linking.openSettings;

  return (
    <View style={[styles.item, { width }]}>
      <Title customStyle={styles.title}>{title}</Title>
      <Label customStyle={styles.subtitle}>{description}</Label>
      <View style={styles.actions}>
        <Button onPress={handlePermission} text={buttonText} />
      </View>
    </View>
  );
}

type RequestPermission = {
  item: Item;
};

type Item = {
  name: string;
  status: PermissionResponse;
  request: () => Promise<PermissionResponse>;
};
