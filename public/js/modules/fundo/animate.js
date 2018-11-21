import {config} from './config-fundo.js';

export const animate = function() {
    makeCircle();
    makeLine();
    config.timer = requestAnimationFrame(animate);
};

const makeCircle = function() {
    if (config.circle.amount > 0 && config.circle.layer > 0) {
        config.fctx1.clearRect(0, 0, config.wWidth, config.wHeight);
        for (let i = 0, len = config.circles.length; i<len; i++) {
            const item = config.circles[i];
            let x = item.x;
            let y = item.y;
            const radius = item.radius;
            const speed = item.speed;
            if (x > config.wWidth + radius) {
                x = -radius;
            } else if (x < -radius) {
                x = config.wWidth + radius;
            } else {
                x += config.sin * speed;
            }
            if (y > config.wHeight + radius) {
                y = -radius;
            } else if (y < -radius) {
                y = config.wHeight + radius;
            } else {
                y -= config.cos * speed;
            }
            item.x = x;
            item.y = y;
            drawCircle(x, y, radius, item.color, item.alpha);
        }
    }
};

const drawCircle = function(x, y, radius, color, alpha) {
    const gradient = config.fctx1.createRadialGradient(x, y, radius, x, y, 0);
    const COLORSTOP1 = 'rgba('+color[0]+','+color[1]+','+color[2]+','+alpha+')';
    const COLORSTOP2 = 'rgba('+color[0]+','+color[1]+','+color[2]+','
        +(alpha - 0.1)+')';
    gradient.addColorStop(0, COLORSTOP1);
    gradient.addColorStop(1, COLORSTOP2);
    config.fctx1.beginPath();
    config.fctx1.arc(x, y, radius, 0, config.M.PI * 2, true);
    config.fctx1.fillStyle = gradient;
    config.fctx1.fill();
};

const makeLine = function() {
    if (config.line.amount > 0 && config.line.layer > 0) {
        config.fctx2.clearRect(0, 0, config.wWidth, config.wHeight);
        for (let j = 0, len = config.lines.length; j<len; j++) {
            const item = config.lines[j];
            let x = item.x;
            let y = item.y;
            const width = item.width;
            const speed = item.speed;
            if (x > config.wWidth + width * config.sin) {
                x = -width * config.sin;
            } else if (x < -width * config.sin) {
                x = config.wWidth + width * config.sin;
            } else {
                x += config.sin*speed;
            }
            if (y > config.wHeight + width * config.cos) {
                y = -width * config.cos;
            } else if (y < -width * config.cos) {
                y = config.wHeight + width * config.cos;
            } else {
                y -= config.cos*speed;
            }
            item.x = x;
            item.y = y;
            drawLine(x, y, width, item.color, item.alpha);
        }
    }
};

const drawLine = function(x, y, width, color, alpha) {
    const endX = x + config.sin * width;
    const endY = y - config.cos * width;
    const gradient = config.fctx2.createLinearGradient(x, y, endX, endY);
    const COLORSTOP1 = 'rgba('+color[0]+','+color[1]+','+color[2]+','+alpha+')';
    const COLORSTOP2 = 'rgba('+color[0]+','+color[1]+','+color[2]+','
        +(alpha - 0.1)+')';
    gradient.addColorStop(0, COLORSTOP1);
    gradient.addColorStop(1, COLORSTOP2);
    config.fctx2.beginPath();
    config.fctx2.moveTo(x, y);
    config.fctx2.lineTo(endX, endY);
    config.fctx2.lineWidth = 3;
    config.fctx2.lineCap = 'round';
    config.fctx2.strokeStyle = gradient;
    config.fctx2.stroke();
};
