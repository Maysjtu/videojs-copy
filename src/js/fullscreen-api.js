
/**
 * @file fullscreen-api.js
 * @module fullscreen-api
 * @private
 */
import document from 'global/document';
/**
 * Store the browser-specific methods for the fullscreen API.
 *
 * @type {Object}
 * @see [Specification]{@link https://fullscreen.spec.whatwg.org}
 * @see [Map Approach From Screenfull.js]{@link https://github.com/sindresorhus/screenfull.js}
 */
const FullscreenApi = {};

// browser API methods
const apiMap = [
    [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror'
    ],
    //WebKit
    [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
    ],
    //Old WebKit (Safari 5.1) todo ??? webkitCancelFullScreen
    [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        //I did however find that Safari 5.1.2 returns undefined for document.webkitFullscreenEnabled while 6.0.1 returns true.
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
    ],
    // Mozilla
    [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
    ],
    // Microsoft
    [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError'
    ]
];