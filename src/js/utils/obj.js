const toString = Object.prototype.toString;
/**
 * Get the keys of an Object
 *
 * @param {Object}
 *        The Object to get the keys from
 *
 * @return {string[]}
 *         An array of the keys from the object. Returns an empty array if the
 *         object passed in was invalid or had no keys.
 *
 * @private
 */
const keys = function(object) {
    return isObject(object)?Object.keys(object):[];
};
/**
 * Array-like iteration for objects.
 *
 * @param {Object} object
 *        The object to iterate over
 *
 * @param {obj:EachCallback} fn
 *        The callback function which is called for each key in the object.
 */
export function each(object, fn) {
    keys(object).forEach(key => fn(object[key], key));
}

/**
 * reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
 */
/**
 * Array-like reduce for objects.
 *
 * @param {Object} object
 *        The Object that you want to reduce.
 *
 * @param {Function} fn
 *         A callback function which is called for each key in the object. It
 *         receives the accumulated value and the per-iteration value and key
 *         as arguments.
 *
 * @param {Mixed} [initial = 0]
 *        Starting value
 *
 * @return {Mixed}
 *         The final accumulated value.
 */
export function reduce(object, fn, initial = 0) {
    return keys(object).reduce(
        (accum, key) => fn(accum, object[key], key), initial);
}
/**
 * Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
 */

export function assign (target, ...sources){
    if (Object.assign) {
        return Object.assign(target, ...sources);
    }
    sources.forEach(source => {
        if (!source) {
            return;
        }
        each(source, (value, key) => {
            target[key] = value;
        });
    });
    return target;
}
export function isObject(value) {
    return !!value && typeof value === 'object';
}
/**
 * Returns whether an object appears to be a "plain" object - that is, a
 * direct instance of `Object`.
 *
 * @param  {Object} value
 * @return {Boolean}
 */
export function isPlain(value) {
    return isObject(value) &&
        toString.call(value) === '[object Object]' &&
        value.constructor === Object;
}
