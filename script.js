window.onload = function() {
    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('music-toggle');
    let isPlaying = false;

    toggleButton.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            toggleButton.textContent = 'Bật Nhạc';
        } else {
            music.play();
            toggleButton.textContent = 'Tắt Nhạc';
        }
        isPlaying = !isPlaying;
    });
};
