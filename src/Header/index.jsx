export * from './Header';
export * from './Logo';

export const sumBreakPoints = (obj1, obj2) => {
    return Object.keys(obj1).reduce((acc, key) => {
        if (obj2.hasOwnProperty(key)) {
            acc[key] = obj1[key] + obj2[key]
        }
        return acc;
    }, {});
};
