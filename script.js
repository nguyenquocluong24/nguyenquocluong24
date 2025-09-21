// Lấy các phần tử từ HTML
const musicPlayer = document.querySelector('.music-player');
const audio = document.getElementById('audio-source');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = playPauseBtn.querySelector('.fa-play');
const pauseIcon = document.createElement('i'); // Tạo icon pause
pauseIcon.className = 'fas fa-pause';

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');

const coverArt = document.getElementById('cover-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// --- Dữ liệu bài hát (bạn có thể thêm nhiều bài vào đây) ---
const songs = [
    {
        title: 'GRAVECHILL',
        artist: 'IMMORTAL',
        music: 'nhac.mp3',
        cover: 'album1.jpg' // Ảnh bìa bài hát
    },
    {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        music: 'nhac2.mp3', // File nhạc thứ 2
        cover: 'album2.jpg'  // Ảnh bìa thứ 2
    }
    // Thêm các bài hát khác vào đây...
];

let songIndex = 0; // Bắt đầu với bài hát đầu tiên

// Tải thông tin bài hát vào trình phát
function loadSong(song) {
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    audio.src = song.music;
    coverArt.src = song.cover;
}

// Chạy bài hát
function playSong() {
    musicPlayer.classList.add('playing');
    playPauseBtn.innerHTML = ''; // Xóa icon cũ
    playPauseBtn.appendChild(pauseIcon); // Thêm icon pause
    audio.play();
}

// Dừng bài hát
function pauseSong() {
    musicPlayer.classList.remove('playing');
    playPauseBtn.innerHTML = ''; // Xóa icon cũ
    playPauseBtn.appendChild(playIcon); // Thêm icon play
    audio.pause();
}

// Xử lý sự kiện nhấn nút Play/Pause
playPauseBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains('playing');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Chuyển bài hát tiếp theo
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Lùi về bài hát trước
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Cập nhật thanh tiến trình
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Cập nhật thời gian
    // 1. Thời lượng tổng
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) { // Chỉ hiển thị khi có dữ liệu
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    
    // 2. Thời gian hiện tại
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Tua bài hát khi click vào thanh tiến trình
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


// Thay đổi âm lượng
function setVolume(e) {
    audio.volume = e.target.value;
}

// Gán các sự kiện
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong); // Tự động chuyển bài khi hết
volumeSlider.addEventListener('input', setVolume);

// Tải bài hát đầu tiên khi trang được mở
loadSong(songs[songIndex]);