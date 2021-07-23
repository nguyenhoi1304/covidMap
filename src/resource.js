import { LanguageCodeEnum } from "./enum";
import { vi, en } from './language';
const Resource2 = new LocalizedStrings({
    [LanguageCodeEnum.vi]: vi,
    // [LanguageCodeEnum.en]: en,
});
// Resource2.setLanguage(lang)
export const Resource = Resource2