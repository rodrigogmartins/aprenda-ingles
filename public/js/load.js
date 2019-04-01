const SPINNER = document.querySelector('.spinner');
const CONTAINER = document.querySelector('#content');

function domReady(cb) {
    CONTAINER.style.display = 'none';
    (function checkDomReady() {
        const state = document.readyState;
        if (state === 'loaded' || state === 'complete') cb();
        else setTimeout(checkDomReady, 200);
    })();
}

domReady(function() {
    SPINNER.style.display = 'none';
    CONTAINER.style.display = 'block';
});
