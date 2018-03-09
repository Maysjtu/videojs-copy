const toString = Object.prototype.toString;




const keys = function(object) {
    return isObject(object)?Object.keys(object):[];
};
export function reduce(object, fn, initial = 0) {
    return keys(object).reduce((accum, key) => fn(accum, object[key], key),initial);
}

export function assign (target, ...sources){
    if (Object.assign) {
        return Object.assign(target, ...sources);
    }

}
