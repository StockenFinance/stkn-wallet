import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Translations
import EnglishTranslation from "../components/englishTranslation";
import ArabicTranslation from "../components/arabicTranslations";

// Configure i18next
i18n.use(initReactI18next).init({
  lng: "en", // Default language
  resources: {
    en: { translation: EnglishTranslation },
    ar: { translation: ArabicTranslation },
  },
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React Native doesn't need HTML escaping
  },
});

// Set current language based on AsyncStorage
AsyncStorage.getItem("selectedLanguage").then((language) => {
  if (language) {
    i18n.changeLanguage(language);
  }
});

export default i18n;
