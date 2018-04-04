/**
 * @file volume-control.js
 */

import Component from '../../component.js';
import checkVolumeSupport from './check-volume-support';
import {isPlain} from '../../utils/obj';
import { throttle, bind } from '../../utils/fn.js';

// Required children
import './volume-bar.js';
