/* global require */
import React from 'react';
import { ConfigProvider } from 'antd';
import { emptyFn } from '..';

export const DEFAULT_LOCALE = 'en_US';

export const LocaleContext = React.createContext({
    locale: DEFAULT_LOCALE,
    setLocale: emptyFn
});

export const LocaleProvider = ({ locale, setLocale, children }) => {
    let l10n;

    try {
        l10n = require(`antd/lib/locale/${locale}.js`).default;
        require.resolve(`./${locale}.js`);
    } catch (e) {
        console.error(`locale "${locale}" not exist. fallback to "${DEFAULT_LOCALE}"`);
        l10n = require(`antd/lib/locale/${DEFAULT_LOCALE}.js`).default;
        locale = DEFAULT_LOCALE;
    }

    return (
        <ConfigProvider locale={l10n}>
            <LocaleContext.Provider value={{ locale, setLocale }}>
                {children}
            </LocaleContext.Provider>
        </ConfigProvider>
    );
};
