// script.js

const contentArea = document.getElementById('content-area');
const playPauseBtn = document.getElementById('play-pause-btn');
const currentSongTitle = document.getElementById('current-song-title');
const currentArtistName = document.getElementById('current-artist-name');
const currentAlbumArt = document.getElementById('current-album-art');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressThumb = document.getElementById('progress-thumb');
const currentTimeSpan = document.getElementById('current-time');
const durationTimeSpan = document.getElementById('duration-time');
const volumeSlider = document.getElementById('volume-slider');

let isPlaying = false;
let progressInterval;
let currentProgress = 0; // in seconds
const songDuration = 210; // 3 minutes 30 seconds for simulation

// Mock data for different sections
const sectionsContent = {
    home: `
        <h2 class="text-3xl font-bold mb-6">Good evening</h2>
        <section class="mb-10">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold text-white">Recently played</h3>
                <a href="#" class="text-gray-400 hover:underline text-sm">See all</a>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="playSong('Driving Anthems', 'Various Artists', 'https://placehold.co/150x150/1DB954/FFFFFF?text=Album+1')">
                    <img src="https://placehold.co/150x150/1DB954/FFFFFF?text=Album+1" alt="Album Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Driving Anthems</h4>
                    <p class="text-xs text-gray-400 truncate">Various Artists</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="playSong('Workout Beats', 'Gym Flow', 'https://placehold.co/150x150/535353/FFFFFF?text=Album+2')">
                    <img src="https://placehold.co/150x150/535353/FFFFFF?text=Album+2" alt="Album Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Workout Beats</h4>
                    <p class="text-xs text-gray-400 truncate">Gym Flow</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="playSong('Relaxing Focus', 'Calm Melodies', 'https://placehold.co/150x150/282828/FFFFFF?text=Album+3')">
                    <img src="https://placehold.co/150x150/282828/FFFFFF?text=Album+3" alt="Album Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Relaxing Focus</h4>
                    <p class="text-xs text-gray-400 truncate">Calm Melodies</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="playSong('Upbeat Pop', 'Top Hits', 'https://placehold.co/150x150/191414/FFFFFF?text=Album+4')">
                    <img src="https://placehold.co/150x150/191414/FFFFFF?text=Album+4" alt="Album Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Upbeat Pop</h4>
                    <p class="text-xs text-gray-400 truncate">Top Hits</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="playSong('Indie Discoveries', 'New Artists', 'https://placehold.co/150x150/777777/FFFFFF?text=Album+5')">
                    <img src="https://placehold.co/150x150/777777/FFFFFF?text=Album+5" alt="Album Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Indie Discoveries</h4>
                    <p class="text-xs text-gray-400 truncate">New Artists</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="playSong('Acoustic Sessions', 'Coffee Shop Jams', 'https://placehold.co/150x150/333333/FFFFFF?text=Album+6')">
                    <img src="https://placehold.co/150x150/333333/FFFFFF?text=Album+6" alt="Album Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Acoustic Sessions</h4>
                    <p class="text-xs text-gray-400 truncate">Coffee Shop Jams</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
            </div>
        </section>
        <section class="mb-10">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold text-white">Made for you</h3>
                <a href="#" class="text-gray-400 hover:underline text-sm">See all</a>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="loadPlaylist('Discover Weekly')">
                    <img src="https://placehold.co/150x150/4CAF50/FFFFFF?text=Playlist+A" alt="Playlist Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Discover Weekly</h4>
                    <p class="text-xs text-gray-400 truncate">Your weekly mixtape of fresh music.</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="loadPlaylist('Release Radar')">
                    <img src="https://placehold.co/150x150/2196F3/FFFFFF?text=Playlist+B" alt="Playlist Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Release Radar</h4>
                    <p class="text-xs text-gray-400 truncate">New music from artists you follow.</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="loadPlaylist('Daily Mix 1')">
                    <img src="https://placehold.co/150x150/FFC107/FFFFFF?text=Playlist+C" alt="Playlist Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Daily Mix 1</h4>
                    <p class="text-xs text-gray-400 truncate">Artist 1, Artist 2, Artist 3</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 group relative cursor-pointer" onclick="loadPlaylist('Your Top Songs 2023')">
                    <img src="https://placehold.co/150x150/9C27B0/FFFFFF?text=Playlist+D" alt="Playlist Art" class="w-full h-auto rounded-md mb-3 shadow-md">
                    <h4 class="text-md font-semibold text-white truncate">Your Top Songs 2023</h4>
                    <p class="text-xs text-gray-400 truncate">The songs you loved most last year</p>
                    <button class="absolute bottom-20 right-6 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
            </div>
        </section>
    `,
    search: `
        <h2 class="text-3xl font-bold mb-6">Search</h2>
        <div class="relative mb-6">
            <input type="text" placeholder="What do you want to listen to?" class="w-full p-4 pl-12 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <section>
            <h3 class="text-2xl font-bold text-white mb-4">Browse all</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <!-- Category Card -->
                <div class="relative bg-purple-600 p-4 rounded-lg shadow-lg h-40 flex items-end justify-start overflow-hidden hover:opacity-90 transition duration-200 cursor-pointer">
                    <h4 class="text-xl font-bold text-white z-10">Podcasts</h4>
                    <img src="https://placehold.co/80x80/000000/FFFFFF?text=🎙️" alt="Podcast Icon" class="absolute bottom-0 right-0 w-20 h-20 transform rotate-45 translate-x-4 translate-y-4">
                </div>
                <div class="relative bg-red-600 p-4 rounded-lg shadow-lg h-40 flex items-end justify-start overflow-hidden hover:opacity-90 transition duration-200 cursor-pointer">
                    <h4 class="text-xl font-bold text-white z-10">Made For You</h4>
                    <img src="https://placehold.co/80x80/000000/FFFFFF?text=❤️" alt="Heart Icon" class="absolute bottom-0 right-0 w-20 h-20 transform rotate-45 translate-x-4 translate-y-4">
                </div>
                <div class="relative bg-blue-600 p-4 rounded-lg shadow-lg h-40 flex items-end justify-start overflow-hidden hover:opacity-90 transition duration-200 cursor-pointer">
                    <h4 class="text-xl font-bold text-white z-10">New Releases</h4>
                    <img src="https://placehold.co/80x80/000000/FFFFFF?text=✨" alt="Sparkle Icon" class="absolute bottom-0 right-0 w-20 h-20 transform rotate-45 translate-x-4 translate-y-4">
                </div>
                <div class="relative bg-green-700 p-4 rounded-lg shadow-lg h-40 flex items-end justify-start overflow-hidden hover:opacity-90 transition duration-200 cursor-pointer">
                    <h4 class="text-xl font-bold text-white z-10">Charts</h4>
                    <img src="https://placehold.co/80x80/000000/FFFFFF?text=📈" alt="Chart Icon" class="absolute bottom-0 right-0 w-20 h-20 transform rotate-45 translate-x-4 translate-y-4">
                </div>
                <div class="relative bg-yellow-600 p-4 rounded-lg shadow-lg h-40 flex items-end justify-start overflow-hidden hover:opacity-90 transition duration-200 cursor-pointer">
                    <h4 class="text-xl font-bold text-white z-10">Pop</h4>
                    <img src="https://placehold.co/80x80/000000/FFFFFF?text=🎶" alt="Music Note Icon" class="absolute bottom-0 right-0 w-20 h-20 transform rotate-45 translate-x-4 translate-y-4">
                </div>
                <div class="relative bg-pink-600 p-4 rounded-lg shadow-lg h-40 flex items-end justify-start overflow-hidden hover:opacity-90 transition duration-200 cursor-pointer">
                    <h4 class="text-xl font-bold text-white z-10">Rock</h4>
                    <img src="https://placehold.co/80x80/000000/FFFFFF?text=🤘" alt="Rock Hand Icon" class="absolute bottom-0 right-0 w-20 h-20 transform rotate-45 translate-x-4 translate-y-4">
                </div>
            </div>
        </section>
    `,
    library: `
        <h2 class="text-3xl font-bold mb-6">Your Library</h2>
        <div class="flex items-center space-x-4 mb-6">
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition duration-200">Playlists</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition duration-200">Artists</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition duration-200">Albums</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition duration-200">Podcasts</button>
        </div>
        <section>
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold text-white">Your Playlists</h3>
                <a href="#" class="text-gray-400 hover:underline text-sm">See all</a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 group relative cursor-pointer flex items-center" onclick="loadPlaylist('My Awesome Playlist')">
                    <img src="https://placehold.co/80x80/FF6347/FFFFFF?text=My+P" alt="Playlist Cover" class="w-20 h-20 rounded-md mr-4">
                    <div>
                        <h4 class="text-lg font-semibold text-white truncate">My Awesome Playlist</h4>
                        <p class="text-sm text-gray-400">50 songs</p>
                    </div>
                    <button class="absolute right-4 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 group relative cursor-pointer flex items-center" onclick="loadPlaylist('Workout Jams')">
                    <img src="https://placehold.co/80x80/20B2AA/FFFFFF?text=Work" alt="Playlist Cover" class="w-20 h-20 rounded-md mr-4">
                    <div>
                        <h4 class="text-lg font-semibold text-white truncate">Workout Jams</h4>
                        <p class="text-sm text-gray-400">30 songs</p>
                    </div>
                     <button class="absolute right-4 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 group relative cursor-pointer flex items-center" onclick="loadPlaylist('Chillout Mix')">
                    <img src="https://placehold.co/80x80/8A2BE2/FFFFFF?text=Chill" alt="Playlist Cover" class="w-20 h-20 rounded-md mr-4">
                    <div>
                        <h4 class="text-lg font-semibold text-white truncate">Chillout Mix</h4>
                        <p class="text-sm text-gray-400">45 songs</p>
                    </div>
                     <button class="absolute right-4 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg">
                        <i class="fas fa-play text-lg"></i>
                    </button>
                </div>
            </div>
        </section>
    `
};

const playlistSongs = {
    'Daily Mix 1': [
        { title: 'Sunrise Serenade', artist: 'Morning Dew', duration: '3:15', album: 'Chill Vibes' },
        { title: 'City Lights', artist: 'Urban Echoes', duration: '4:02', album: 'Night Drive' },
        { title: 'Forest Whisper', artist: 'Nature Sounds', duration: '2:50', album: 'Ambient Moods' },
        { title: 'Rhythm of the Rain', artist: 'Cloudburst', duration: '3:40', album: 'Rainy Days' },
        { title: 'Starlight Lullaby', artist: 'Dream Weaver', duration: '5:10', album: 'Sleepy Tunes' },
    ],
    'Liked Songs': [
        { title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', album: 'A Night at the Opera' },
        { title: 'Hotel California', artist: 'Eagles', duration: '6:30', album: 'Hotel California' },
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', album: 'Led Zeppelin IV' },
        { title: 'Imagine', artist: 'John Lennon', duration: '3:03', album: 'Imagine' },
    ],
    'Chill Vibes': [
        { title: 'Smooth Jazz Flow', artist: 'Jazz Ensemble', duration: '4:20', album: 'Relaxing Jazz' },
        { title: 'Acoustic Dreams', artist: 'Solo Guitarist', duration: '3:05', album: 'Unplugged Sessions' },
        { title: 'Misty Mountains', artist: 'Ambient Collective', duration: '6:15', album: 'Nature Soundscapes' },
    ],
    'Workout Mix': [
        { title: 'Pump It Up', artist: 'Fitness Freaks', duration: '3:30', album: 'Gym Anthems' },
        { title: 'Adrenaline Rush', artist: 'The Shredders', duration: '2:45', album: 'High Intensity' },
        { title: 'Sweat It Out', artist: 'Beat Blasters', duration: '3:10', album: 'Cardio Kings' },
    ],
    'Focus Tunes': [
        { title: 'Deep Work', artist: 'Concentration Crew', duration: '5:00', album: 'Productivity Sounds' },
        { title: 'Brain Wave Booster', artist: 'Mind Architect', duration: '4:30', album: 'Cognitive Enhancers' },
    ],
    'My Awesome Playlist': [
        { title: 'Awesome Track One', artist: 'Artist A', duration: '3:45', album: 'Awesome Album' },
        { title: 'Fantastic Tune Two', artist: 'Artist B', duration: '4:10', album: 'Fantastic LP' },
    ],
    'Workout Jams': [
        { title: 'Gym Time', artist: 'Workout Warriors', duration: '3:00', album: 'Gym Hits' },
        { title: 'Energy Boost', artist: 'Power Play', duration: '3:20', album: 'High Energy' },
    ],
    'Chillout Mix': [
        { title: 'Relaxing Moment', artist: 'Zen Sounds', duration: '4:50', album: 'Peaceful Vibes' },
        { title: 'Evening Breeze', artist: 'Calm Melodies', duration: '3:55', album: 'Soothing Harmonies' },
    ],
    'Discover Weekly': [
        { title: 'New Sound Discovery 1', artist: 'Emerging Artist X', duration: '3:10', album: 'Discovery Album 1' },
        { title: 'Hidden Gem 2', artist: 'Indie Band Y', duration: '4:05', album: 'Hidden Tracks' },
    ],
    'Release Radar': [
        { title: 'Fresh Drop Single', artist: 'Popular Artist Z', duration: '2:59', album: 'New Singles' },
        { title: 'Album Debut Track', artist: 'Rising Star W', duration: '3:33', album: 'Debut Album' },
    ],
    'Your Top Songs 2023': [
        { title: 'Top Hit 2023 A', artist: 'Global Sensation 1', duration: '3:25', album: 'Best of 2023' },
        { title: 'Popular Tune 2023 B', artist: 'Chart Topper 2', duration: '3:40', album: 'Yearly Rewind' },
    ]
};


// Function to format time from seconds to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    const icon = playPauseBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play-circle');
        icon.classList.add('fa-pause-circle');
        if (progressInterval) clearInterval(progressInterval); // Clear previous interval if any
        progressInterval = setInterval(() => {
            currentProgress++;
            updateProgressBar();
            if (currentProgress >= songDuration) {
                clearInterval(progressInterval);
                isPlaying = false;
                icon.classList.remove('fa-pause-circle');
                icon.classList.add('fa-play-circle');
                currentProgress = 0; // Reset for next play
                updateProgressBar(); // Ensure progress bar resets
            }
        }, 1000); // Update every second
    } else {
        icon.classList.remove('fa-pause-circle');
        icon.classList.add('fa-play-circle');
        clearInterval(progressInterval);
    }
});

// Update progress bar
function updateProgressBar() {
    const progress = (currentProgress / songDuration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeSpan.textContent = formatTime(currentProgress);
    durationTimeSpan.textContent = formatTime(songDuration); // Keep duration fixed for now
}

// Seek functionality for progress bar
progressBarContainer.addEventListener('click', (e) => {
    const containerWidth = progressBarContainer.offsetWidth;
    const clickX = e.offsetX;
    const newProgressPercent = (clickX / containerWidth);
    currentProgress = Math.round(songDuration * newProgressPercent);
    updateProgressBar();
    if (!isPlaying) { // If not playing, update UI but don't start timer
        const icon = playPauseBtn.querySelector('i');
        icon.classList.remove('fa-pause-circle');
        icon.classList.add('fa-play-circle');
        clearInterval(progressInterval);
    }
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    // In a real app, this would control the audio element's volume
    // For now, it just visually updates the slider
    console.log("Volume:", e.target.value);
});

// Function to update the currently playing song details
function playSong(title, artist, albumArtUrl) {
    currentSongTitle.textContent = title;
    currentArtistName.textContent = artist;
    currentAlbumArt.src = albumArtUrl;
    currentProgress = 0; // Reset progress when new song plays
    if (!isPlaying) { // Automatically play if not already playing
        playPauseBtn.click();
    } else {
        updateProgressBar(); // Just update progress if already playing
    }
}

// Function to load content based on sidebar selection
function loadSection(sectionId) {
    contentArea.innerHTML = sectionsContent[sectionId];
    // Optionally, update active state of sidebar links
    document.querySelectorAll('aside nav a').forEach(link => {
        link.classList.remove('bg-gray-800', 'text-white');
        link.classList.add('text-gray-400');
    });
    document.querySelector(`aside nav a[onclick="loadSection('${sectionId}')"]`).classList.add('bg-gray-800', 'text-white');
    document.querySelector(`aside nav a[onclick="loadSection('${sectionId}')"]`).classList.remove('text-gray-400');
    contentArea.scrollTop = 0; // Scroll to top when changing section
}

// Function to load a specific playlist's songs
function loadPlaylist(playlistName) {
    const songs = playlistSongs[playlistName] || [];
    let songsHtml = `
        <h2 class="text-3xl font-bold mb-6">${playlistName}</h2>
        <div class="flex items-center space-x-4 mb-6">
            <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-md transition duration-200" onclick="playSong('${songs[0].title}', '${songs[0].artist}', 'https://placehold.co/150x150/1DB954/FFFFFF?text=P')">
                <i class="fas fa-play mr-2"></i> Play
            </button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-md transition duration-200">
                <i class="fas fa-random mr-2"></i> Shuffle
            </button>
        </div>
        <div class="space-y-2">
            <!-- Table header -->
            <div class="grid grid-cols-[auto,1fr,1fr,0.5fr,auto] gap-4 py-2 px-4 text-gray-400 text-sm font-semibold border-b border-gray-700">
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div>Time</div>
                <div></div>
            </div>
    `;

    songs.forEach((song, index) => {
        songsHtml += `
            <div class="grid grid-cols-[auto,1fr,1fr,0.5fr,auto] gap-4 py-3 px-4 rounded-lg hover:bg-gray-800 transition duration-200 group cursor-pointer items-center" onclick="playSong('${song.title}', '${song.artist}', 'https://placehold.co/50x50/1DB954/FFFFFF?text=NP')">
                <div class="text-gray-400 group-hover:text-white">${index + 1}</div>
                <div>
                    <div class="text-white font-medium truncate">${song.title}</div>
                    <div class="text-gray-400 text-sm truncate">${song.artist}</div>
                </div>
                <div class="text-gray-400 text-sm truncate">${song.album}</div>
                <div class="text-gray-400 text-sm">${song.duration}</div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2">
                    <button class="text-gray-400 hover:text-white"><i class="fas fa-heart"></i></button>
                    <button class="text-gray-400 hover:text-white"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            </div>
        `;
    });

    songsHtml += `</div>`;
    contentArea.innerHTML = songsHtml;
    contentArea.scrollTop = 0; // Scroll to top when changing section

    // Update sidebar active link
    document.querySelectorAll('aside nav a').forEach(link => {
        link.classList.remove('bg-gray-800', 'text-white');
        link.classList.add('text-gray-400');
    });
    // Try to find if it's a 'Your Library' sub-item or a direct playlist link
    const directPlaylistLink = document.querySelector(`aside nav a[onclick="loadPlaylist('${playlistName}')"]`);
    if (directPlaylistLink) {
        directPlaylistLink.classList.add('bg-gray-800', 'text-white');
        directPlaylistLink.classList.remove('text-gray-400');
    } else {
        // If it's a dynamically loaded playlist from 'Your Library' section
        document.querySelector(`aside nav a[onclick="loadSection('library')"]`).classList.add('bg-gray-800', 'text-white');
        document.querySelector(`aside nav a[onclick="loadSection('library')"]`).classList.remove('text-gray-400');
    }
}


// Initial load of the home section
document.addEventListener('DOMContentLoaded', () => {
    loadSection('home');
    updateProgressBar(); // Initialize progress bar display
});
