import * as Dom from './dom'
import window from 'global/window'

const USER_AGENT = window.navigator && window.navigator.userAgent||'';
const webkitVersionMap = (/AppleWebkit\/([\d.]+)/i).exec(USER_AGENT);
const appleWebkitVersion = webkitVersionMap?parseFloat(webkitVersionMap.pop()):null;
/**
 * Device is an iPhone
 */
export const IS_IPAD = (/iPad/i).test(USER_AGENT);
export const IS_IPHONE = (/iPhone/i).test(USER_AGENT)&&!IS_IPAD;
export const IS_IPOD = (/iPod/i).test(USER_AGENT);
export const IS_IOS = IS_IPAD||IS_IPHONE||IS_IPOD;

/**
 * 如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。
 * 如果没有找到任何匹配的文本， match() 将返回 null。
 * 否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
 * 该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。
 */
export const IOS_VERSION = (function(){
    const match = USER_AGENT.match(/OS (\d+)_/i);
    if(match&&match[1]) {
        return match[1];
    }
    return null;
}());

export const IS_ANDROID = (/Android/i).test(USER_AGENT);

export const ANDROID_VERSION = (function(){
    //This matches Android Major.Minor.Patch versions
    // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
    const match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
    if(!match) return null;

    const major = match[1] && parseFloat(match[1]);
    const minor = match[1] && parseFloat(match[2]);

    if(major&&minor) {
        return parseFloat(match[1] + '.' + match[2]);
    } else if(major) {
        return major;
    }
    return null;
}());

export const IS_OLD_ANDROID = IS_ANDROID && (/webkit/i).test(USER_AGENT) && ANDROID_VERSION < 2.3;
//??
export const IS_NATIVE_ANDROID = IS_ANDROID && ANDROID_VERSION < 5 && appleWebkitVersion < 537;

export const IS_FIREFOX = (/Firefox/i).test(USER_AGENT);
export const IS_EDGE = (/Edge/i).test(USER_AGENT);
export const IS_CHROME = !IS_EDGE && (/Chrome/i).test(USER_AGENT);
export const CHROME_VERSION = (function() {
    const match = USER_AGENT.match(/Chrome\/(\d+)/);

    if (match && match[1]) {
        return parseFloat(match[1]);
    }
    return null;
}());
export const IS_IE8 = (/MSIE\s8\.0/).test(USER_AGENT);
export const IE_VERSION = (function() {
    const result = (/MSIE\s(\d+)\.\d/).exec(USER_AGENT);
    let version = result && parseFloat(result[1]);

    if (!version && (/Trident\/7.0/i).test(USER_AGENT) && (/rv:11.0/).test(USER_AGENT)) {
        // IE 11 has a different user agent string than other IE versions
        version = 11.0;
    }

    return version;
}());
export const IS_IE8 = (/MSIE\s8\.0/).test(USER_AGENT);
export const IE_VERSION = (function() {
    const result = (/MSIE\s(\d+)\.\d/).exec(USER_AGENT);
    let version = result && parseFloat(result[1]);

    if (!version && (/Trident\/7.0/i).test(USER_AGENT) && (/rv:11.0/).test(USER_AGENT)) {
        // IE 11 has a different user agent string than other IE versions
        version = 11.0;
    }

    return version;
}());

export const TOUCH_ENABLED = Dom.isReal() && (
    'ontouchstart' in window ||
    window.DocumentTouch &&
    window.document instanceof window.DocumentTouch);

export const BACKGROUND_SIZE_SUPPORTED = (
Dom.isReal() &&
'backgroundSize' in window.document.createElement('video').style);

