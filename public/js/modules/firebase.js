import {config} from './config.firebase.js';

export const FIREBASE = require('firebase');

if (!FIREBASE.apps.length) {
    FIREBASE.initializeApp(config);
}

export const DATABASE = FIREBASE.database();
export const AUTH = FIREBASE.auth();
