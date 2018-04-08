import window from 'global/window';
import document from 'global/document';
import mergeOptions from '../utils/merge-options';

/**
 * This function is used to fire a sourceset when there is something
 * similar to `mediaEl.load()` being called. It will try to find the source via
 * the `src` attribute and then the `<source>` elements. It will then fire `sourceset`
 * with the source that was found or empty string if we cannot know. If it cannot
 * find a source then `sourceset` will not be fired.
 *
 * @param {Html5} tech
 *        The tech object that sourceset was setup on
 *
 * @return {boolean}
 *         returns false if the sourceset was not fired and true otherwise.
 */
const sourcesetLoad = (tech) => {
    const el = tech.el();
    // if `el.src` is set, that source will be loaded.
    if (el.src) {
        tech.triggerSourceset(el.src);
        return true;
    }
    /**
     * Since there isn't a src property on the media element, source elements will be used for
     * implementing the source selection algorithm. This happens asynchronously and
     * for most cases were there is more than one source we cannot tell what source will
     * be loaded, without re-implementing the source selection algorithm. At this time we are not
     * going to do that. There are three special cases that we do handle here though:
     *
     * 1. If there are no sources, do not fire `sourceset`.
     * 2. If there is only one `<source>` with a `src` property/attribute that is our `src`
     * 3. If there is more than one `<source>` but all of them have the same `src` url.
     *    That will be our src.
     */
    const sources = tech.$$('source');
    const srcUrls = [];
    let src = '';

    // if there are no sources, do not fire sourceset
    if (!sources.length) {
        return false;
    }

    // only count valid/non-duplicate source elements
    for (let i = 0; i < sources.length; i++) {
        const url = sources[i].src;

        if (url && srcUrls.indexOf(url) === -1) {
            srcUrls.push(url);
        }
    }

    // there were no valid sources
    if (!srcUrls.length) {
        return;
    }

    // there is only one valid source element url
    // use that
    if (srcUrls.length === 1) {
        src = srcUrls[0];
    }

    tech.triggerSourceset(src);
    return true;

};