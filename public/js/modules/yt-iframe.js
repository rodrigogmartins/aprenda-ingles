let player;

export const onYouTubeIframeAPIReady = function(codigo, tempoInicio, tempoFim) {
    player = new YT.Player('player', {
        videoId: codigo,
        playerVars: {
            autoplay: 1,
            showinfo: 0,
            modestbranding: 1,
            fs: 1,
            cc_load_policy: 0,
            iv_load_policy: 3,
            start: tempoInicio,
            end: tempoFim,
            loop: 1,
            autohide: 0
        }
    });
};
