/* global require */
import React, { useContext } from 'react';
import { DEFAULT_LOCALE, LocaleContext } from './LocaleContext';

export const useL10n = () => {
    let { locale } = useContext(LocaleContext);
    let l10n;

    try {
        let antdL10n = require(`antd/lib/locale/${locale}.js`).default;
        let localL10n = require(`./${locale}.js`);
        l10n = { ...antdL10n, ...localL10n };
    } catch (e) {
        console.error(`locale "${locale}" not exist. fallback to "${DEFAULT_LOCALE}"`);
        let antdL10n = require(`antd/lib/locale/${DEFAULT_LOCALE}.js`).default;
        let localL10n = require(`./${DEFAULT_LOCALE}.js`);
        l10n = { ...antdL10n, ...localL10n };
    }

    return l10n;
};
