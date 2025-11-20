import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

// Determine initial language: prefer saved value, otherwise navigator, otherwise 'en'
const saved = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
const nav = typeof navigator !== "undefined" ? navigator.language.split("-")[0] : null;
const initialLng = saved || nav || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLng,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Keep document direction in sync with language changes
function applyDir(lang: string) {
  if (typeof document !== "undefined") {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }
}

applyDir(initialLng);

i18n.on("languageChanged", (lng) => {
  applyDir(lng);
  try {
    if (typeof localStorage !== "undefined") localStorage.setItem("lang", lng);
  } catch (e) {
    // ignore
  }
});

export default i18n;
