const RED_CIRCLE = 157;
const GREEN_CIRCLE = 97;
const BLUE_CIRCLE = 207;
const RED_LINE = 255;
const GREEN_LINE = 255;
const BLUE_LINE = 255;
const M = window.Math;
const degreeAngle = 20 / 360 * M.PI * 2;

export const config = {
    circle: {
        amount: 18,
        layer: 3,
        color: [RED_CIRCLE, GREEN_CIRCLE, BLUE_CIRCLE],
        alpha: 0.3
    },
    line: {
        amount: 12,
        layer: 3,
        color: [RED_LINE, GREEN_LINE, BLUE_LINE],
        alpha: 0.3
    },
    speed: 0.5,
    angle: 20,
    M: M,
    degree: degreeAngle,
    sin: M.sin(degreeAngle),
    cos: M.cos(degreeAngle),
    wWidth: 0,
    wHeight: 0,
    lines: [],
    circles: [],
    bctx: '',
    fctx1: '',
    fctx2: '',
    timer: ''
};

export const requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback, element) {
        setTimeout(callback, 1000 / 60);
    };

export const cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    clearTimeout;
