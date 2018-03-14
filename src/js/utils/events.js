import * as DomData from './dom-data'
import * as Guid from './guid.js'
import log from './log.js'
import window from 'global/window'
import document from 'global/document'

/**
 * Clean up the listener cache and dispatchers
 *
 * @param {Element|Object} elem
 *        Element to clean up
 *
 * @param {string} type
 *        Type of event to clean up
 */
function _cleanUpEvents(elem, type) {
    const data = DomData.getData(elem);
    // Remove the events of a particular type if there are none left
    if (data.handlers[type].length === 0) {
        delete data.handlers[type];
        // data.handlers[type] = null;
        // Setting to null was causing an error with data.handlers

        // Remove the meta-handler from the element
        if (elem.removeEventListener) {
            elem.removeEventListener(type, data.dispatcher, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, data.dispatcher);
        }
    }
    // Remove the events object if there are no types left
    if (Object.getOwnPropertyNames(data.handlers).length <= 0) {
        delete data.handlers;
        delete data.dispatcher;
        delete data.disabled;
    }
    // Finally remove the element data if there is no data left
    if (Object.getOwnPropertyNames(data).length === 0) {
        DomData.removeData(elem);
    }
}

/**
 * Loops through an array of event types and calls the requested method for each type.
 *
 * @param {Function} fn
 *        The event method we want to use.
 *
 * @param {Element|Object} elem
 *        Element or object to bind listeners to
 *
 * @param {string} type
 *        Type of event to bind to.
 *
 * @param {EventTarget~EventListener} callback
 *        Event listener.
 */
function _handleMultipleEvents(fn, elem, types, callback) {
    types.forEach(function(type) {
        // Call the event method for each one of the types
        fn(elem, type, callback);
    });
}
/**
 * Fix a native event to have standard property values
 *
 * @param {Object} event
 *        Event object to fix.
 *
 * @return {Object}
 *         Fixed event object.
 */
export function fixEvent(event) {

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }





}




















