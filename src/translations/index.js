import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import en from './en.json';
import hk from './zh-HK.json';
import zh from './zh-CN.json';

const translations = { en, hk, zh };

const { languageTag } = RNLocalize.findBestAvailableLanguage(
  Object.keys(translations),
) || { languageTag: 'en' };

i18n.locale = languageTag;
// i18n.locale = RNLocalize.locale
i18n.translations = translations;
// 默认语言
// i18n.defaultLocale = 'en'
// 启用或禁用回退机制
i18n.fallbacks = true

export default i18n;
