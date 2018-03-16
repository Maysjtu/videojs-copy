/**
 * @file media-error.js
 */

import {assign, isObject} from './utils/obj';

/**
 * A Custom `MediaError` class which mimics the standard HTML5 `MediaError` class.
 *
 * @param {number|string|Object|MediaError} value
 *        This can be of multiple types:
 *        - number: should be a standard error code
 *        - string: an error message (the code will be 0)
 *        - Object: arbitrary properties
 *        - `MediaError` (native): used to populate a video.js `MediaError` object
 *        - `MediaError` (video.js): will return itself if it's already a
 *          video.js `MediaError` object.
 *
 * @see [MediaError Spec]{@link https://dev.w3.org/html5/spec-author-view/video.html#mediaerror}
 * @see [Encrypted MediaError Spec]{@link https://www.w3.org/TR/2013/WD-encrypted-media-20130510/#error-codes}
 *
 * @class MediaError
 */

function MediaError(value) {

    if(value instanceof MediaError) {
        return value;
    }
    if(typeof value === 'number') {
        this.code = value;
    } else if(typeof value === 'string') {
        // default code is zero, so this is a custom error
        this.message = value;
    } else if(isObject(value)){
        if (typeof value.code === 'number') {
            this.code = value.code;
        }
        assign(this, value);
    }
    if (!this.message) {
        this.message = MediaError.defaultMessages[this.code] || '';
    }
}
MediaError.prototype.code = 0;
MediaError.prototype.message = '';

MediaError.prototype.status = null;
MediaError.errorTypes = [
    'MEDIA_ERR_CUSTOM',
    'MEDIA_ERR_ABORTED',
    'MEDIA_ERR_NETWORK',
    'MEDIA_ERR_DECODE',
    'MEDIA_ERR_SRC_NOT_SUPPORTED',
    'MEDIA_ERR_ENCRYPTED'
];

MediaError.defaultMessages = {
    1: 'You aborted the media playback',
    2: 'A network error caused the media download to fail part-way.',
    3: 'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.',
    4: 'The media could not be loaded, either because the server or network failed or because the format is not supported.',
    5: 'The media is encrypted and we do not have the keys to decrypt it.'
};
// Add types as properties on MediaError
// e.g. MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
for (let errNum = 0; errNum < MediaError.errorTypes.length; errNum++) {
    MediaError[MediaError.errorTypes[errNum]] = errNum;
    // values should be accessible on both the class and instance
    MediaError.prototype[MediaError.errorTypes[errNum]] = errNum;
}

export default MediaError;
