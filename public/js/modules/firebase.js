const FIREBASE = require('firebase');

import {config} from './config.firebase.js';

if (!FIREBASE.apps.length) {
  FIREBASE.initializeApp(config);
}

export const DATABASE = FIREBASE.database();
export const AUTH = FIREBASE.auth();
