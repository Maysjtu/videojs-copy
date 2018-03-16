/**
 * @file track-list.js
 */
import EventTarget from '../event-target';
import * as browser from '../utils/browser.js';
import document from 'global/document';

class TrackList extends EventTarget {
    constructor(tracks = [], list = null) {
        super();
        if(!list) {
            list = this;
            if(browser.IS_IE8) {
                list = document.createElement('custom');
                for (const prop in TrackList.prototype) {
                    if (prop !== 'constructor') {
                        list[prop] = TrackList.prototype[prop];
                    }
                }
            }
        }
        list.tracks_ = [];
        Object.defineProperty(list, 'length', {
            get() {
                return this.tracks_.length;
            }
        });
        for (let i = 0; i < tracks.length; i++) {
            list.addTrack(tracks[i]);
        }

        // must return the object, as for ie8 it will not be this
        // but a reference to a document object
        return list;
    }
    addTrack(track) {
        const index = this.tracks_.length;

        if(!('' + index in this)) {
            Object.defineProperty(this, index, {
                get() {
                    return this.tracks_[index];
                }
            });
        }
        if(this.tracks_.indexOf(track) === -1) {
            this.tracks_.push(track);
        }
        this.trigger({
            track,
            type: 'addtrack'
        });
    }
    removeTrack(rtrack) {
        let track;

        for(let i = 0,l = this.length; i < l; i++) {
            if(this[i] === rtrack) {
                track = this[i];
                if(track.off) {
                    track.off();
                }
                this.tracks_.splice(i, 1);
                break;
            }
        }
        if(!track) {
            return;
        }
        this.trigger({
            track,
            type: 'removetrack'
        });
    }
    getTrackById(id) {
        let result = null;

        for (let i = 0, l = this.length; i < l; i++) {
            const track = this[i];

            if (track.id === id) {
                result = track;
                break;
            }
        }

        return result;
    }

}
TrackList.prototype.allowedEvents_ = {
    change: 'change',
    addtrack: 'addtrack',
    removetrack: 'removetrack'
};
for (const event in TrackList.prototype.allowedEvents_) {
    TrackList.prototype['on' + event] = null;
}
export default TrackList;
