export const defaultLang = 'en';

export const languages = {
  en: {
    code: 'en',
    label: 'English',
    shortLabel: 'EN',
    htmlLang: 'en',
  },
  'zh-cn': {
    code: 'zh-cn',
    label: '简体中文',
    shortLabel: '中文',
    htmlLang: 'zh-CN',
  },
} as const;

export type Lang = keyof typeof languages;

export const supportedLangs = Object.keys(languages) as Lang[];

export function isLang(value: string | undefined): value is Lang {
  return Boolean(value && value in languages);
}

export function normalizeLang(value: string | undefined): Lang {
  return isLang(value) ? value : defaultLang;
}

export function localizedPath(lang: Lang, path = '/') {
  if (path === '/') {
    return `/${lang}/`;
  }

  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

export function switchLangPath(pathname: string, lang: Lang) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isLang(segments[0])) {
    segments[0] = lang;
    return `/${segments.join('/')}${pathname.endsWith('/') ? '/' : ''}`;
  }

  return localizedPath(lang, pathname);
}
