import { Hint, Label, Title } from "Components/Typography";
import Theme from "Shared/theme";
import { translate } from "Shared/utils/translate";
import { translation } from "../translation";
import { formatDate } from "Shared/utils/time";

export function VideoInfo({ asset }) {
  const lang = translate(translation);

  return (
    <>
      <Title customStyle={{ color: Theme.color.text.dark }}>Información</Title>

      <Attribute label={lang.t("VIDEO_INFO.FILENAME")} value={asset.filename} />
      <Attribute label={lang.t("VIDEO_INFO.DURATION")} value={asset.duration} />
      <Attribute
        label={lang.t("VIDEO_INFO.CREATION_TIME")}
        value={formatDate(asset.creationTime)}
      />
      <Attribute
        label={lang.t("VIDEO_INFO.MODIFICATION_TIME")}
        value={formatDate(asset.modificationTime)}
      />
    </>
  );
}

const Attribute = ({ label, value }) => {
  const textColor = Theme.color.text.dark;

  return (
    <>
      <Label
        transform="capitalize"
        customStyle={{
          color: textColor,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {label}:
      </Label>
      <Hint customStyle={{ color: textColor, textAlign: "center" }}>
        {value}
      </Hint>
    </>
  );
};
