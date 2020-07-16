module.exports = {
    Buttons: {
        addButton: 'Hinzufügen',
        editButton: 'Bearbeiten',
        deleteButton: 'Löschen',
        reloadButton: 'Neu Laden',
        backButton: 'Zurück',
        searchButton: 'Suche',
        saveButton: 'Speichern',
        cancelButton: 'Abbrechen',
        closeButton: 'Schließen',
        undoButton: 'Rückgänging',
        settingsButton: 'Einstellungen',
        basketButton: 'In Warenkorb',
        loginButton: 'Anmelden',
        uploadButton: 'Hochladen'
    },
    Login: {
        username: 'Username',
        password: 'Passwort',
        rememberMe: 'Angemeldet bleiben',
        forgotPassword: 'Passwort vergessen?',
        register: 'Noch kein Account?',
        loginText: 'Anmelden'
    },
    Form: {
        moreText: 'mehr',
        addNewField: 'Feld hinzufügen',
        searchText: 'Suche',
    },
    Tree: {
      newNode: 'Neuer Knoten',
      editNode: 'Knoten Bearbeiten'
    },
    Validation: {
        form: 'Formularfelder enthalten Fehler',
        default: 'Validierung fehlgeschlagen in Feld %s',
        required: '%s ist ein Pflichtfeld',
        enum: '%s muss eins von %s sein',
        whitespace: '%s darf nicht leer sein',
        date: {
            format: '%s Datum %s ist ungültig für das Format %s',
            parse: '%s Datum konnte nicht analysiert werden, %s ist ungültig',
            invalid: '%s Datum %s ist ungültig',
        },
        types: {
            string: '%s ist kein %s',
            method: '%s ist keine %s (function)',
            array: '%s ist kein %s',
            object: '%s ist kein %s',
            number: '%s ist keine %s',
            date: '%s ist kein %s',
            boolean: '%s ist kein %s',
            integer: '%s ist kein %s',
            float: '%s ist kein %s',
            regexp: '%s ist keine gültige %s',
            email: '%s ist keine gültige %s',
            url: '%s ist keine gültige %s',
            hex: '%s ist kein gültiger %s',
        },
        string: {
            len: '%s muss genau %s Zeichen lang sein',
            min: '%s muss mindestens %s Zeichen lang sein',
            max: '%s darf nicht länger als %s Zeichen lang sein',
            range: '%s muss zwischen %s und %s Zeichen lang sein',
        },
        number: {
            len: '%s muss %s sein',
            min: '%s darf nicht kleiner sein als %s',
            max: '%s darf nicht größer sein als %s',
            range: '%s muss zwischen %s und %s sein',
        },
        array: {
            len: '%s muss genau %s Elemente haben',
            min: '%s darf nicht weniger als %s Elemente haben',
            max: '%s darf nicht mehr als %s Elemente haben',
            range: '%s muss zwischen %s und %s Elemente haben',
        },
        pattern: {
            mismatch: '%s Wert %s entspricht nicht dem Muster %s',
        }
    }
};

