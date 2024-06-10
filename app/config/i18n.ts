import ruGeneral from "~/locales/ru/general";
import uzGeneral from "~/locales/uz/general";
import enGeneral from '~/locales/en/general'

export const supportedLngs = ["uz", "ru", "en"];

export const fallbackLng = "uz";

export const defaultNS = "general";

export const resources = {
    ru: {
        general: ruGeneral,
    },
    uz: {
        general: uzGeneral,
    },
    en: {
        general: enGeneral
    }
};