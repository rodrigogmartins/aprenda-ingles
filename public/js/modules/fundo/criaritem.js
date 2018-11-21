import {config, cancelAnimationFrame, requestAnimationFrame}
    from './config-fundo.js';
import {animate} from './animate.js';

export const createItem = function() {
    desenhaCirculos();
    desenhaLinhas();
    cancelAnimationFrame(config.timer);
    config.timer = requestAnimationFrame(animate);
    drawBack();
};

const desenhaCirculos = function() {
    config.circles = [];
    if (config.circle.amount > 0 && config.circle.layer > 0) {
        for (let i = 0; i < config.circle.amount/config.circle.layer; i++) {
            for (let j = 0; j < config.circle.layer; j++) {
                config.circles.push({
                    x: config.M.random() * config.wWidth,
                    y: config.M.random() * config.wHeight,
                    radius: config.M.random()*(20+j*5)+(20+j*5),
                    color: config.circle.color,
                    alpha: config.M.random()*0.2+(config.circle.alpha-j*0.1),
                    speed: config.speed*(1+j*0.5)
                });
            }
        }
    }
};

const desenhaLinhas = function() {
    config.lines = [];
    if (config.line.amount > 0 && config.line.layer > 0) {
        for (let m = 0; m < config.line.amount/config.line.layer; m++) {
            for (let n = 0; n < config.line.layer; n++) {
                config.lines.push({
                    x: config.M.random() * config.wWidth,
                    y: config.M.random() * config.wHeight,
                    width: config.M.random()*(20+n*5)+(20+n*5),
                    color: config.line.color,
                    alpha: config.M.random()*0.2+(config.line.alpha-n*0.1),
                    speed: config.speed*(1+n*0.5)
                });
            }
        }
    }
};

const drawBack = function() {
    config.bctx.clearRect(0, 0, config.wWidth, config.wHeight);
    const gradient = [];
    gradient[0] = config.bctx.createRadialGradient(config.wWidth*0.3,
        config.wHeight*0.1, 0,
        config.wWidth*0.3, config.wHeight*0.1, config.wWidth*0.9);
    gradient[0].addColorStop(0, 'rgb(0, 26, 77)');
    gradient[0].addColorStop(1, 'transparent');
    config.bctx.translate(config.wWidth, 0);
    config.bctx.scale(-1, 1);
    config.bctx.beginPath();
    config.bctx.fillStyle = gradient[0];
    config.bctx.fillRect(0, 0, config.wWidth, config.wHeight);
    gradient[1] = config.bctx.createRadialGradient(config.wWidth*0.1,
        config.wHeight*0.1, 0,
        config.wWidth*0.3, config.wHeight*0.1, config.wWidth);
    gradient[1].addColorStop(0, 'rgb(0, 150, 240)');
    gradient[1].addColorStop(1, 'transparent');
    config.bctx.translate(config.wWidth, 0);
    config.bctx.scale(-1, 1);
    config.bctx.beginPath();
    config.bctx.fillStyle = gradient[1];
    config.bctx.fillRect(0, 0, config.wWidth, config.wHeight);
    gradient[2] = config.bctx.createRadialGradient(config.wWidth*0.1,
        config.wHeight*0.5, 0,
        config.wWidth*0.1, config.wHeight*0.5, config.wWidth*0.5);
    gradient[2].addColorStop(0, 'rgb(40, 20, 105)');
    gradient[2].addColorStop(1, 'transparent');
    config.bctx.beginPath();
    config.bctx.fillStyle = gradient[2];
    config.bctx.fillRect(0, 0, config.wWidth, config.wHeight);
};
