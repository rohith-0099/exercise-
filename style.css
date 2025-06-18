/* style.css */

/* Custom scrollbar for better aesthetics on dark theme */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: #282828;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background: #535353;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: #888;
}

/* Base font for the body */
body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Keyframe for button click animation */
@keyframes button-press {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
}

/* Apply animation to play/pause button on click */
#play-pause-btn.animate-press {
    animation: button-press 0.2s ease-out;
}

/* Custom glow effect for play/pause button */
#play-pause-btn i {
    transition: text-shadow 0.2s ease-in-out;
}

#play-pause-btn:active i {
    text-shadow: 0 0 8px rgba(29, 185, 84, 0.7); /* Green glow */
}

/* Ensure the progress thumb moves with the progress bar */
#progress-bar-container:hover #progress-thumb {
    left: var(--thumb-position, 0%); /* Controlled by JS */
    transform: translateX(-50%); /* Center the thumb */
    opacity: 1;
}

/* Initial state for section content transition */
#main-content-area.animate-enter {
    opacity: 1;
    transform: translateY(0);
}
