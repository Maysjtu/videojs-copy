/**
 * @file player.js
 */
// Subclasses Component
import Component from './component.js';

import {version} from '../../package.json';
import document from 'global/document';
import window from 'global/window';
import tsml from 'tsml';
import evented from './mixins/evented';
import * as Events from './utils/events.js';
import * as Dom from './utils/dom.js';
import * as Fn from './utils/fn.js';
import * as Guid from './utils/guid.js';
import * as browser from './utils/browser.js';
import log from './utils/log.js';
import toTitleCase, { titleCaseEquals } from './utils/to-title-case.js';
import { createTimeRange } from './utils/time-ranges.js';
import { bufferedPercent } from './utils/buffer.js';
import * as stylesheet from './utils/stylesheet.js';
import FullscreenApi from './fullscreen-api.js';
import MediaError from './media-error.js'
import safeParseTuple from 'safe-json-parse/tuple';
import {assign} from './utils/obj';
import mergeOptions from './utils/merge-options.js';
import {silencePromise} from './utils/promise';
import textTrackConverter from './tracks/text-track-list-converter.js';
import ModalDialog from './modal-dialog'
import Tech from './tech/tech.js';
import * as middleware from './tech/middleware.js';
import {ALL as TRACK_TYPES} from './tracks/track-types';
import filterSource from './utils/filter-source';

// The following imports are used only to ensure that the corresponding modules
// are always included in the video.js package. Importing the modules will
// execute them and they will register themselves with video.js.
import './tech/loader.js';
import './poster-image.js';
import './tracks/text-track-display.js';
import './loading-spinner.js';
import './big-play-button.js';
import './close-button.js';
import './control-bar/control-bar.js';
import './error-display.js';
import './tracks/text-track-settings.js';
import './resize-manager.js';

// Import Html5 tech, at least for disposing the original video tag.
import './tech/html5.js';






