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
