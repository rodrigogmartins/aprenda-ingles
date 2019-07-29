const SPINNER = document.querySelector('.spinner');

function domReady(cb) {
    (function checkDomReady() {
        const state = document.readyState;
        if (state === 'loaded' || state === 'complete') cb();
        else setTimeout(checkDomReady, 200);
    })();
}

domReady(function() {
    SPINNER.style.display = 'none';
});
