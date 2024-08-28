import { createI18n } from 'vue-i18n';
import en from './en-US';
import cn from './zh-CN';
import yn from './yn-VN';

export const LOCALE_OPTIONS = [
  { label: 'China', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: 'Tiếng Việt', value: 'yn-VN' },
];
const defaultLocale = localStorage.getItem('arco-locale') || 'en-US';

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  allowComposition: true,
  messages: {
    'en-US': en,
    'yn-VN': yn,
    'zh-CN': cn,
  },
});

export default i18n;
