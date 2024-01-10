import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

export function translate(translation: Translation) {
  const i18n = new I18n(translation);

  i18n.locale = Localization.locale;

  i18n.enableFallback = true;

  return i18n;
}

type Translation = {
  [key: string]: string | object;
};
