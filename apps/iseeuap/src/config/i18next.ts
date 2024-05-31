import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: { en, es },
    fallbackLng: "en",
  });
