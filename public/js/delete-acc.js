import {deletar} from './firebase-auth.js';

const BTN_DELETE = document.querySelector('#delete-accont');

BTN_DELETE.addEventListener('click', deletar);
