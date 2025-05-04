import React, { createContext, useContext, useState, useMemo } from "react";
import { messages } from "./i18n/messages";

export const I18nContext = createContext({
  locale: "pt",
  setLocale: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState("pt");

  const t = useMemo(() => {
    return (key) => {
      return messages[locale]?.[key] || key;
    };
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
