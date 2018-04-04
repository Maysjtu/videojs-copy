/**
 * @file volume-control.js
 */
import Component from '../component.js';
import checkVolumeSupport from './volume-control/check-volume-support';
import {isPlain} from '../utils/obj';

// Required children
import './volume-control/volume-control.js';
import './mute-toggle.js';
