
const songs = [
    {
      title: "Another Song",
      artist: "Alka Yagnik",
      src: "songs/song1.mp3",// Path to MP3 file
      cover: "covers/Alka Yagnik.jpg"// Path to cover image
    },
    {
      title: "Another Song",
      artist: "arijit",
      src: "songs/song2.mp3",
      cover: "covers/arijit.jpg"
    },
    {
      title: "Teri Yadoon Main",
      artist: "kk",
      src: "songs/song3.mp3", 
      cover: "covers/kk.jpg"   
    },
    {
      title: "Another Song",
      artist: "udit",
      src: "songs/song4.mp3",
      cover: "covers/udit.jpg"
    }
  ];
  
  
  
  // Player Functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Audio element
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const volumeControl = document.getElementById('volume');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const cover = document.getElementById('cover');
    
    // Current song index
    let songIndex = 0;
    
    // Load song details into player
    function loadSong(song) {
      songTitle.textContent = song.title;
      songArtist.textContent = song.artist;
      audio.src = song.src;
      cover.src = song.cover;
    }
    
    // Play song
    function playSong() {
      audio.play();
      playBtn.src = "pause_button.jpeg"; // Change to pause icon
    }
    
    // Pause song
    function pauseSong() {
      audio.pause();
      playBtn.src = "player_icon3.png"; // Change back to play icon
    }
    
    // Update progress bar & time
    function updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      progress.value = progressPercent;
      
      // Format time display (MM:SS)
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
      
      // Update total duration (only if not NaN)
      if (!isNaN(duration)) {
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
    }
    
    // Seek song when clicking progress bar
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    }
    
    // Next song
    function nextSong() {
      songIndex++;
      if (songIndex > songs.length - 1) songIndex = 0;
      loadSong(songs[songIndex]);
      playSong();
    }
    
    // Previous song
    function prevSong() {
      songIndex--;
      if (songIndex < 0) songIndex = songs.length - 1;
      loadSong(songs[songIndex]);
      playSong();
    }
    
    // Set volume
    function setVolume() {
      audio.volume = this.value / 100;
    }
    
    // ===== EVENT LISTENERS =====
    // Play/Pause button
    playBtn.addEventListener('click', () => {
      const isPlaying = !audio.paused;
      isPlaying ? pauseSong() : playSong();
    });
    
    // Previous/Next buttons
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    
    // Progress bar updates
    audio.addEventListener('timeupdate', updateProgress);
    progress.addEventListener('click', setProgress);
    
    // Auto-play next song when current ends
    audio.addEventListener('ended', nextSong);
    
    // Volume control
    volumeControl.addEventListener('input', setVolume);
    
    // Make song cards clickable
    document.querySelectorAll('.big-card1, .boxes').forEach((card, index) => {
      card.addEventListener('click', () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
      });
    });
    
    // Load first song on startup
    loadSong(songs[songIndex]);
  
  });
  











  // Mobile menu toggle functionality
const mobileMenuToggle = document.createElement('div');
mobileMenuToggle.className = 'mobile-menu-toggle';
mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i> Menu';
document.querySelector('.sidebar').prepend(mobileMenuToggle);

mobileMenuToggle.addEventListener('click', function() {
  document.querySelector('.library').classList.toggle('active');
});

// Better card click handling for mobile
document.querySelectorAll('.big-card1, .boxes').forEach((card, index) => {
  card.addEventListener('click', function(e) {
    // Don't trigger on mobile if clicking a link
    if (window.innerWidth <= 768 && (e.target.tagName === 'A' || e.target.tagName === 'I')) {
      return;
    }
    
    songIndex = index % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  });
});