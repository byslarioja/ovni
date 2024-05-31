import { ComponentProps, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import Flag from "react-flagkit";

const flags = {
  en: "GB",
  es: "ES",
};

export function ToggleLanguage(props: ComponentProps<"button">) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<"en" | "es">("en");

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Button size={"lg"} variant="ghost" onClick={toggleLanguage} {...props}>
      <Flag country={flags[language]} className="mr-2" />
      {language.toUpperCase()}
    </Button>
  );
}
