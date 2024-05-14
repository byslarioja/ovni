import { Hint, Label, Title } from "Components/Typography";
import Theme from "Shared/theme";
import { translate } from "Shared/utils/translate";
import { translation } from "../translation";
import { formatDate } from "Shared/utils/time";
import { AssetStatus, PersistedAsset } from "Screens/Camera/services/types";
import { View } from "react-native";
import { useMemo } from "react";

export function VideoInfo({ asset }: { asset: PersistedAsset }) {
  const lang = translate(translation);

  const statusStr = useMemo(() => {
    if (asset.status === AssetStatus.Pending)
      return lang.t("VIDEO_INFO.VALUE.PENDING");
    if (asset.status === AssetStatus.Uploaded)
      return lang.t("VIDEO_INFO.VALUE.UPLOADED");

    return lang.t("VIDEO_INFO.VALUE.REJECTED");
  }, [asset.status]);

  return (
    <View>
      <Title customStyle={{ color: Theme.color.scheme.white[500] }}>
        Información
      </Title>

      <Attribute
        label={lang.t("VIDEO_INFO.LABEL.FILENAME")}
        value={asset.filename}
      />
      <Attribute label={lang.t("VIDEO_INFO.LABEL.STATE")} value={statusStr} />
      <Attribute
        label={lang.t("VIDEO_INFO.LABEL.DURATION")}
        value={`${asset.duration}s`}
      />
      <Attribute
        label={lang.t("VIDEO_INFO.LABEL.CREATION_TIME")}
        value={formatDate(asset.creationTime)}
      />
      <Attribute
        label={lang.t("VIDEO_INFO.LABEL.MODIFICATION_TIME")}
        value={formatDate(asset.modificationTime)}
      />
    </View>
  );
}

const Attribute = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  const textColor = Theme.color.scheme.white[500];

  return (
    <>
      <Label
        transform="capitalize"
        customStyle={{
          color: textColor,
          fontWeight: "bold",
        }}
      >
        {label}:
      </Label>
      <Hint customStyle={{ color: textColor }}>{value}</Hint>
    </>
  );
};
