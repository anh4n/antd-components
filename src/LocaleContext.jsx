import React from 'react';
import { ConfigProvider } from 'antd';
import { emptyFn } from '.';

export const DEFAULT_LOCALE = 'en_US';

export const LocaleContext = React.createContext({
    locale: DEFAULT_LOCALE,
    setLocale: emptyFn,
});

export const LocaleProvider = ({locale, setLocale, children}) => {
    let l10n;

    try {
        let antdL10n = require(`antd/lib/locale/${locale}.js`).default;
        let localL10n = require(`./Locales/${locale}.js`);
        l10n = {...antdL10n, ...localL10n};
    } catch (e) {
        console.error(`locale "${locale}" not exist. fallback to "${DEFAULT_LOCALE}"`);
        let antdL10n = require(`antd/lib/locale/${DEFAULT_LOCALE}.js`).default;
        let localL10n = require(`./Locales/${DEFAULT_LOCALE}.js`);
        l10n = {...antdL10n, ...localL10n};
        locale = DEFAULT_LOCALE;
    }

    return (
        <ConfigProvider locale={l10n}>
            <LocaleContext.Provider value={{l10n, locale, setLocale}}>
            {children}
            </LocaleContext.Provider>
        </ConfigProvider>
    );
};
