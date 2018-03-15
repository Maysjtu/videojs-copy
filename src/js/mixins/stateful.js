import {isEvented} from './evented';
import * as Obj from '../utils/obj';

/**
 * Contains methods that provide statefulness to an object which is passed
 * to {@link module:stateful}.
 *
 * @mixin StatefulMixin
 */


const StatefulMixin = {
    /**
     * A hash containing arbitrary keys and values representing the state of
     * the object.
     *
     * @type {Object}
     */
    state: {},
    setState(stateUpdates) {
        // Support providing the `stateUpdates` state as a function.
        if (typeof stateUpdates === 'function') {
            stateUpdates = stateUpdates();
        }
        let changes;
        Obj.each(stateUpdates, (value, key) => {
            if(this.state[key]!==value) {
                changes = changes || {};
                changes[key] = {
                    from: this.state[key],
                    to: value
                };
            }
            this.state[key] = value;
        });

        // Only trigger "statechange" if there were changes AND we have a trigger
        // function. This allows us to not require that the target object be an
        // evented object.
        if (changes && isEvented(this)) {
            /**
             * An event triggered on an object that is both
             * {@link module:stateful|stateful} and {@link module:evented|evented}
             * indicating that its state has changed.
             *
             * @event    module:stateful~StatefulMixin#statechanged
             * @type     {Object}
             * @property {Object} changes
             *           A hash containing the properties that were changed and
             *           the values they were changed `from` and `to`.
             */
            this.trigger({
                changes,
                type: 'statechanged'
            });
        }
        return changes;
    }
};
function stateful(target, defaultState){
    Obj.assign(target, StatefulMixin);
    // This happens after the mixing-in because we need to replace the `state`
    // added in that step.
    target.state = Obj.assign({}, target.state, defaultState);
    // Auto-bind the `handleStateChanged` method of the target object if it exists.
    if (typeof target.handleStateChanged === 'function' && isEvented(target)) {
        target.on('statechanged', target.handleStateChanged);
    }
    return target;
}
export default stateful;

