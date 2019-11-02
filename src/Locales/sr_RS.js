module.exports = {
    Buttons: {
        addButton: 'додати',
        editButton: 'уреди',
        deleteButton: 'избрисати',
        reloadButton: 'Освежи',
        backButton: 'назад',
        searchButton: 'претражи',
        saveButton: 'сачуваи',
        cancelButton: 'отказажи',
        closeButton: 'затвори',
        undoButton: 'назад',
        settingsButton: 'подешавања',
        basketButton: 'Додај у корпу',
        uploadButton: 'отпреми'
    },
    Form: {
        moreText: 'више',
        addNewField: 'Додај поље'
    },
    Validation: {
        default: 'Грешка, провери ваљаности на пољу %s',
        required: '%s је потребан',
        enum: '%s мора да буде један од %s',
        whitespace: '%s не може бити празан',
        date: {
            format: '%s датум %s није важећи за форматирање %s',
            parse: '%s датум није могао бити рашчлањен, %s није важећи ',
            invalid: '%s датум %s није важећи',
        },
        types: {
            string: '%s није %s',
            method: '%s није %s (function)',
            array: '%s није %s',
            object: '%s није %s',
            number: '%s није %s',
            date: '%s није %s',
            boolean: '%s није %s',
            integer: '%s није %s',
            float: '%s није %s',
            regexp: '%s није важећи %s',
            email: '%s није важећи %s',
            url: '%s није важећи %s',
            hex: '%s није важећи %s',
        },
        string: {
            len: '%s мора бити тачно %s знакова',
            min: '%s мора бити најмање %s знакова',
            max: '%s не може бити дужи од %s знакова',
            range: '%s мора бити између %s и %s знакова',
        },
        number: {
            len: '%s мора да буде једнако %s',
            min: '%s не може бити мањи од %s',
            max: '%s не може бити већа од %s',
            range: '%s мора бити између %s and %s',
        },
        array: {
            len: '%s мора бити тачно %s у дужини',
            min: '%s не може бити мањи од %s у дужини',
            max: '%s Не може бити већа од %s у дужини',
            range: '%s мора бити између %s и %s у дужини',
        },
        pattern: {
            mismatch: '%s вредност %s не подудара се са обрасцем %s',
        }
    }
};
