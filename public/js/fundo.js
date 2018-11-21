import {createItem} from './modules/fundo/criaritem.js';
import {config} from './modules/fundo/config-fundo.js';
const jQuery = require('jquery');

jQuery(document).ready(function($) {
    const canvas = $('#bg').children('canvas');
    const background = canvas[0];
    const foreground1 = canvas[1];
    const foreground2 = canvas[2];

    if (background.getContext) {
        config.bctx = background.getContext('2d');
        config.fctx1 = foreground1.getContext('2d');
        config.fctx2 = foreground2.getContext('2d');

        $(document).ready(function() {
            setCanvasHeight();
            createItem();
        });

        $(window).resize(function() {
            setCanvasHeight();
            createItem();
        });

        const setCanvasHeight = function() {
            config.wWidth = $(window).width();
            config.wHeight = $(window).height(),
            canvas.each(function() {
                // eslint-disable-next-line no-invalid-this
                this.width = config.wWidth;
                // eslint-disable-next-line no-invalid-this
                this.height = config.wHeight;
            });
        };
    }
});
