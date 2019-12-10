const insert = (array, item, index) => {
    if (index !== undefined && index != null && index !== -1) {
        return [...array.slice(0, index + 1), item, ...array.slice(index + 1)];
    }

    return [...array, item];
};

const remove = (array, predicate) => [
    ...array.filter(rec => rec[predicate[0]] !== predicate[1])
];

const update = (array, predicate, item) => (
    array.map(rec => rec[predicate[0]] === predicate[1] ? item : rec)
);

export const PureArray = {
    insert,
    remove,
    update
};
