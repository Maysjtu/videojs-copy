/**
 * @file tech.js
 */

import Component from '../component';
import mergeOptions from '../utils/merge-options.js';
import * as Fn from '../utils/fn.js';
import log from '../utils/log.js';
import { createTimeRange } from '../utils/time-ranges.js';
import { bufferedPercent } from '../utils/buffer.js';
import MediaError from '../media-error.js';
import window from 'global/window';
import document from 'global/document';
import {isPlain} from '../utils/obj';
import * as TRACK_TYPES from '../tracks/track-types';
